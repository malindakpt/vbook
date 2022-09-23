import axios from "axios";
import config from "config";
import { DecodedAuthToken, LoginStatusResponse } from "types";
import { AuthClaims } from "../types";
import {CdfAuthService} from "./cdfAuthService";

const cdfAuthService = new CdfAuthService({
  baseURL: config.apiBaseUrl
});

export class AuthService  {
  public decodeApiKeyToken = (apiKey: string): Promise<DecodedAuthToken> => {
     const url = `${config.apiBaseUrl}/login/status`;
    return axios
      .get<LoginStatusResponse>(url, {
        headers: { 'api-key': apiKey },
      })
      .then((response) => response.data.data);
  }

  public decodeJwtToken = async (
    token: string
  ): Promise<DecodedAuthToken> => {
    const decodedToken: AuthClaims = await cdfAuthService.decodeAccessToken({ token });
    return {
      user: decodedToken.user,
      email: decodedToken.email || '',
      project: decodedToken.project || '',
      projectId: decodedToken.projectId || -1,
      projects: decodedToken.projects,
      loggedIn: true,
    };
  };


}

export default new AuthService();