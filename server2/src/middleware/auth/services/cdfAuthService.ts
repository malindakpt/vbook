import { createHash } from 'crypto';

import jwtDecode from 'jwt-decode';
import { verify } from 'jsonwebtoken';
import jwkToPem, { JWK } from 'jwk-to-pem';
import { APIError } from '@cognite/error';
import axios, { AxiosResponse } from 'axios';

import {
  AuthService,
  AuthClaims,
  TokenInspect,
  LoginStatus,
  DecodeAccessTokenParams,
  DecodeOIDCAccessTokenParams,
  DecodeIdTokenParams,
  DecodeApiKeyParams,
  DecodedToken,
  TokenType,
} from '../types';
import { getHeaders } from '../headers';
import { errors } from '../errors';

type Options = {
  baseURL: string;
  aadAppId?: string;
  requestIdHeaderName?: string;
  serviceName?: string;
};

class CdfAuthService implements AuthService {
  private static readonly ISS_LEGACY = 'api-auth.auth';
  private static readonly ISS_AZURE_AUTH = 'https://sts.windows.net/';
  private static readonly ISS_AZURE_ID = 'https://login.microsoftonline.com/';
  private static readonly ISS_INTERNAL = 'internal-jwks-host';

  private readonly baseURL: string;
  private readonly requestIdHeaderName: string;
  private readonly serviceName: string;

  constructor({
    baseURL,
    requestIdHeaderName = 'x-request-id',
    serviceName = 'CdfAuthService',
  }: Options) {
    this.baseURL = baseURL;
    this.requestIdHeaderName = requestIdHeaderName;
    this.serviceName = serviceName;
  }

  // deprecated entry method
  public async decodeApiKey({ apiKey  }: DecodeApiKeyParams): Promise<AuthClaims> {
    const url = `${this.baseURL}/login/status`;
    const authRequest = axios.get<{ data: LoginStatus }>(url, {
      headers: { 'api-key': apiKey },
    });
    return this.executeLegacyAuthRequest(authRequest, { iss: 'api-key' });
  }

  // main entry method, should be called: authenticateToken
  public async decodeAccessToken({
    token,
    aadAppId,
  }: DecodeAccessTokenParams): Promise<AuthClaims> {
    const decodedToken = CdfAuthService.decodeToken(token);

    const { isAccessToken, isLegacyToken, isIdToken } =
      CdfAuthService.detectTokenType({
        decodedToken,
      });

    if (isIdToken && aadAppId) {
      await this.validateTokenSignature(
        token,
        decodedToken.tid,
        decodedToken.iss
      );
      return this.processOIDCIdToken({ decodedToken, aadAppId });
    }

    if (isAccessToken) {
      return this.processOIDCAccessToken({ decodedToken, token });
    }

    if (isLegacyToken) {
      return this.processLegacyAccessToken({ decodedToken, token });
    }

    throw new APIError({
      status: 401,
      message: errors.invalidToken,
    });
  }

  public validateTid(tid: string): void {
    if (!/^[0-9a-fA-F-]+$/.test(tid)) {
      throw new APIError({ status: 401, message: `Invalid tid found: ${tid}` });
    }
  }

  private async getPublicKey({
    tid,
    iss,
  }: {
    tid: string;
    iss: string;
  }): Promise<JWK[]> {
    // default - only accept Azure tokens for now
    let keyUrl = `https://login.microsoftonline.com/${tid}/discovery/v2.0/keys`;

    const isInternal = iss === CdfAuthService.ISS_INTERNAL;
    if (isInternal) {
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // <- internal-jwks-host has 'misconfigured' CA
      if (process.env.USE_LOCAL_JWKS_HOST) {
        keyUrl = `https://127.0.0.1:4443/${tid}.json`; // <- for testing locally
      } else {
        // keyUrl = `https://127.0.0.1:4443/${tid}.json`; // <- for testing locally
        keyUrl = `https://internal-jwks-host.auth:443/${tid}.json`;
      }
    }

    const publicKeys = await axios
      .get(keyUrl)
      .then((result) => {
        return result.data.keys;
      })
      .catch((error) => {
        throw new APIError({
          status: 500,
          message: error,
        });
      });

    return publicKeys;
  }

  public async validateTokenSignature(
    token: string,
    tid: string,
    iss: string
  ): Promise<void> {
    if (iss !== CdfAuthService.ISS_INTERNAL) {
      this.validateTid(tid);
    }

    const publicKeys = await this.getPublicKey({ tid, iss });

    const verifySignature = await Promise.all(
      publicKeys.map((key) => {
        const publicKey = jwkToPem(key);

        return new Promise((resolve) => {
          verify(token, publicKey, (error: unknown, decoded: unknown) => {
            resolve(error === null ? decoded : false);
          });
        });
      })
    );

    const foundAGoodToken = verifySignature.some((result) => !!result);

    if (!foundAGoodToken) {
      throw new APIError({
        status: 401,
        message: errors.invalidSigning,
      });
    }
  }

  public static getUserIdFromToken(token: string): string {
    const decodedToken = CdfAuthService.decodeToken(token);

    const { isAccessToken, isLegacyToken, isIdToken } =
      CdfAuthService.detectTokenType({
        decodedToken,
      });

    if (isLegacyToken) {
      return CdfAuthService.getUserIdFromLegacyToken(decodedToken);
    }

    if (isAccessToken || isIdToken) {
      return CdfAuthService.getUserIdFromOIDCToken(decodedToken);
    }

    return '';
  }

  public static getNameFromToken(token: string): string {
    const decodedToken = CdfAuthService.decodeToken(token);

    const { isAccessToken, isLegacyToken, isIdToken } =
      CdfAuthService.detectTokenType({
        decodedToken,
      });

    if (isLegacyToken) {
      return CdfAuthService.getUserIdFromLegacyToken(decodedToken);
    }

    if (isAccessToken || isIdToken) {
      return (
        CdfAuthService.getNameFromOIDCToken(decodedToken) ||
        CdfAuthService.getEmailFromOIDCToken(decodedToken) ||
        ''
      );
    }

    return '';
  }

  public static decodeToken(token: string): DecodedToken {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch {
      throw new APIError({
        status: 401,
        message: errors.cannotDecode,
      });
    }
  }

  public static detectTokenType({
    decodedToken,
  }: {
    decodedToken: DecodedToken;
  }): TokenType {
    const isLegacyToken = decodedToken.iss.includes(CdfAuthService.ISS_LEGACY);

    let isAccessToken =
      decodedToken.iss.includes(CdfAuthService.ISS_AZURE_AUTH) ||
      decodedToken.iss === CdfAuthService.ISS_INTERNAL;

    let isIdToken =
      decodedToken.iss.includes(CdfAuthService.ISS_AZURE_ID) ||
      decodedToken.iss === CdfAuthService.ISS_INTERNAL;

    if (isIdToken && isAccessToken) {
      isIdToken = !decodedToken.scp;
      isAccessToken = !!decodedToken.scp;
    }

    return {
      isLegacyToken,
      isIdToken,
      isAccessToken,
    };
  }

  // should be private, but is public to make testing easier
  public async processOIDCIdToken({
    decodedToken,
    aadAppId,
  }: DecodeIdTokenParams): Promise<AuthClaims> {
       try {
      this.validateIdToken(decodedToken, aadAppId);

      return {
        user: CdfAuthService.getUserIdFromOIDCToken(decodedToken),
        roles: decodedToken.roles || [],
        projects: [], // none for id token
        capabilities: [], // none for id token
        type: 'id' as const,
        name: CdfAuthService.getNameFromOIDCToken(decodedToken),
        email: CdfAuthService.getEmailFromOIDCToken(decodedToken),
        idpId: CdfAuthService.getIdpIdToken(decodedToken),
      };
    } catch (error) {
      if (error instanceof APIError) {
        throw new APIError({
          status: 401,
          message: error.message || 'Unauthorized',
        });
      } else {
        throw this.throwUnknownError({ error });
      }
    } 
  }

  // should be private, but is public to make testing easier
  public async processLegacyAccessToken({
    token,
    decodedToken,
  }: DecodeAccessTokenParams & {
    decodedToken: DecodedToken;
  }): Promise<AuthClaims> {
    const url = `${this.baseURL}/login/status`;
    const authRequest = axios.get<{ data: LoginStatus }>(
      url,
      getHeaders(token)
    );
    return this.executeLegacyAuthRequest(authRequest, decodedToken);
  }

  /** Use this for OIDC tokens */
  public static async tokenInspect(
    baseUrl: string,
    token: string
  ): Promise<TokenInspect> {
    const url = `${baseUrl}/api/v1/token/inspect`;
    const results = await axios.get<TokenInspect>(url, getHeaders(token));
    return results.data;
  }

  /** Use this for legacy tokens */
  public static async loginStatus(
    baseUrl: string,
    token: string
  ): Promise<LoginStatus> {
    const url = `${baseUrl}/login/status`;
    const results = await axios.get<{ data: LoginStatus }>(
      url,
      getHeaders(token)
    );
    return results.data.data;
  }

  public static getTokenType = (token: string): TokenType | undefined => {
    try {
      const decodedToken = CdfAuthService.decodeToken(token);

      return CdfAuthService.detectTokenType({ decodedToken });
    } catch (_error) {
      return undefined;
    }
  };

  // should be private, but is public to make testing easier
  public async processOIDCAccessToken({
    token,
    decodedToken,
  }: DecodeOIDCAccessTokenParams): Promise<AuthClaims> {
    const url = `${this.baseURL}/api/v1/token/inspect`;
    const authRequest = axios.get<TokenInspect>(url, getHeaders(token));
    return this.executeOIDCAuthRequest(authRequest, decodedToken);
  }

  private validateOIDCClaims = (claims: AuthClaims): AuthClaims => {
    if (claims.user === '') {
      throw new APIError({
        status: 401,
        message: errors.missingUser,
      });
    }
    return claims;
  };

  private validateLegacyClaims = (
    claims: LoginStatus,
  ): LoginStatus => {
    if (claims.user === '') {
          throw new APIError({
        status: 401,
        message: errors.missingUser,
      });
    }
    if (claims.projectId === -1) {
      throw new APIError({
        status: 401,
        message: errors.missingProject,
      });
    }
    if (claims.loggedIn === false) {
      throw new APIError({ status: 401, message: 'Not logged in' });
    }
    return claims;
  };

  private validateIdToken = (
    decodedToken: DecodedToken,
    aadAppId: string,
  ): DecodedToken => {
    if (decodedToken.iss.includes(CdfAuthService.ISS_LEGACY)) {
      throw new APIError({
        status: 401,
        message: errors.idRequired,
      });
    }

    if (!decodedToken.aud.includes(aadAppId || '')) {
            throw new APIError({
        status: 401,
        message: errors.invalidApp,
      });
    }

    if (!this.isTimestampPastCurrent(decodedToken.nbf)) {
      throw new APIError({
        status: 401,
        message: errors.future,
      });
    }

    if (this.isTimestampPastCurrent(decodedToken.exp)) {
      throw new APIError({
        status: 401,
        message: errors.expired,
      });
    }

    return decodedToken;
  };

  private executeLegacyAuthRequest = async (
    authRequest: Promise<AxiosResponse<{ data: LoginStatus }>>,
    decodedToken: Partial<DecodedToken>
  ): Promise<AuthClaims> => {
    try {
      const response = await authRequest;
      const cdfRequestId = this.extractRequestId(response);
      const user = CdfAuthService.getUserIdFromLegacyToken(decodedToken);
      const name = CdfAuthService.getNameFromLegacyToken(user);

      const claims = {
        ...response.data.data,
        capabilities: [],
        roles: [],
        projects: [],
        type: 'legacy' as const,
        email: user,
        name,
        idpId: CdfAuthService.getIdpIdToken(decodedToken),
      };

      if (user) {
        // api key does not get user from the token
        claims.user = user;
      }
      
      this.validateLegacyClaims(claims);
      return claims;
    } catch (error: unknown) {
      if (error instanceof APIError) {
        throw new APIError({
          status: 401,
          message: error.message || 'Unauthorized',
        });
      } else {
        throw this.throwUnknownError({ error });
      }
    } 
  };

  private executeOIDCAuthRequest = async (
    authRequest: Promise<AxiosResponse<TokenInspect>>,
    decodedToken: DecodedToken
  ): Promise<AuthClaims> => {
    try {
      const response = await authRequest;
      const cdfRequestId = this.extractRequestId(response);
      const claims = {
        ...response.data,
        user: CdfAuthService.getUserIdFromOIDCToken(decodedToken),
        issuer: decodedToken.iss,
        roles: [],
        type: 'auth' as const,
        name: CdfAuthService.getNameFromOIDCToken(decodedToken),
        email: CdfAuthService.getEmailFromOIDCToken(decodedToken),
        appId: CdfAuthService.getAppId(decodedToken),
      };
      return this.validateOIDCClaims(claims);
    } catch (error) {
      if (error instanceof APIError) {
              throw new APIError({
          status: 401,
          message: error.message || 'Unauthorized',
        });
      } else {
        throw this.throwUnknownError({ error });
      }
    } 
  };

  private static getUserIdFromLegacyToken(
    decodedToken: Partial<DecodedToken>
  ): string {
    return decodedToken.unique_name || '';
  }

  private static getNameFromLegacyToken(user: string): string {
    const name = user.split('@')[0];
    // TODO: Transform name from e.g., test.t-test -> Test T Test
    return name;
  }

  private static getUserIdFromOIDCToken(decodedToken: DecodedToken): string {
    // oid is unique for the user in the idp
    // sub changes between id and auth tokens
    return decodedToken.oid;
  }

  private static getIdpIdToken(
    decodedToken?: Partial<DecodedToken>
  ): string | undefined {
    if (!decodedToken?.iss) return undefined;

    const { iss } = decodedToken;

    const hash = createHash('sha256');
    return hash.update(iss).digest('hex');
  }

  private static getAppId(
    decodedToken?: Partial<DecodedToken>
  ): string | undefined {
    return decodedToken?.appid || decodedToken?.azp;
  }

  private static getNameFromOIDCToken(
    decodedToken: DecodedToken
  ): string | undefined {
    if (decodedToken?.name) {
      return decodedToken.name;
    }

    if (decodedToken?.given_name || decodedToken?.family_name) {
      const name = [decodedToken.given_name, decodedToken.family_name];
      return name.join(' ').trim();
    }

    return undefined;
  }

  private static getEmailFromOIDCToken(
    decodedToken: DecodedToken
  ): string | undefined {
    return decodedToken?.unique_name || decodedToken?.preferred_username;
  }

  private isTimestampPastCurrent(timeToCheck: number): boolean {
    const currentTime = +new Date() / 1000;
    const padding = 0; // incase we want to expire the token before the expiry time

    return timeToCheck - currentTime - padding < 0;
  }

  private extractRequestId = <T>(
    resp: AxiosResponse<T>
  ): string | undefined => {
    return resp.headers[this.requestIdHeaderName];
  };

  private throwUnknownError = ({
    error,
  }: {
    error: unknown;
  }): void => {
    throw new APIError({
      status: 401,
      message: 'Unauthorized',
    });
  };
}

export { CdfAuthService };
