type JwtScheme = { accessToken: string };
type ApiKeyScheme = { apiKey: string };

export type AuthScheme = JwtScheme | ApiKeyScheme;

export function isJwtScheme(scheme: AuthScheme): scheme is JwtScheme {
  return (scheme as JwtScheme).accessToken !== undefined;
}

export type ProxiedAuthHeaders =
  | { Authorization: string }
  | { 'api-key': string };

  export type LoginStatus = {
  loggedIn: boolean;
  user: string;
  project: string;
  projectId: number;
};
// map API response directly to the result type:
export type CdfJWTClaims = LoginStatus;

// result from the token/inspect endpoint
export type TokenInspect = {
  subject: string;
  projects: {
    projectUrlName: string;
    groups: number[];
  }[];
  capabilities: Capability[];
};

// unified type we should all switch to using
// this provides an abstraction between the token decoding
// and processing vs the actual token contents
// allowing us to run this auth service on both
// auth tokens and id tokens
export type AuthClaims = {
  idpId?: string;
  appId?: string;
  user: string;
  projects: Project[];
  capabilities: Capability[];
  roles: string[];
  type: 'legacy' | 'auth' | 'id';
  email?: string;
  name?: string;
} & Partial<LoginStatus>; // extend the new type with the old type for back compat

export type Project = {
    projectUrlName: string;
    groups: number[]; 
}
type Capability = {
  [s: string]: {
    actions?: string[];
    version?: number;
    scope?: unknown;
    projects?: string[];
  };
};

export type DecodeApiKeyParams = {
  apiKey: string;
};

export type DecodeAccessTokenParams = {
  token: string;
  aadAppId?: string;
};

export type AuthService = {
  decodeApiKey(params: DecodeApiKeyParams): Promise<AuthClaims>;
  decodeAccessToken(params: DecodeAccessTokenParams): Promise<AuthClaims>;
};

export type DecodedToken = {
  iss: string;
  exp: number;
  groups: string[];
  nbf: number; // azure
  aud: string; // azure
  sub: string; // azure
  name?: string; // azure
  appid?: string; // azure - Only present in v1.0 tokens
  azp?: string; // azure - Only present in v2.0 tokens
  oid: string; // unique user id
  nonce: string; //
  scp: string; // token access
  tid: string; // token id
  preferred_username?: string;
  roles?: string[]; // azure id tokens
  project_id?: number; // from cdf legacy tokens
  unique_name?: string; // from cdf legacy tokens
  given_name?: string;
  family_name?: string;
};

export type TokenType = {
  isLegacyToken: boolean;
  isAccessToken: boolean;
  isIdToken: boolean;
};

export type DecodeOIDCAccessTokenParams = DecodeAccessTokenParams & {
  decodedToken: DecodedToken;
};

export type DecodeIdTokenParams = {
  decodedToken: DecodedToken;
  aadAppId: string;
};