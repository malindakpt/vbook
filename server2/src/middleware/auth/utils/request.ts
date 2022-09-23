import { Request } from 'express';
import { APIError } from '../errors';
import { AuthScheme } from '../types';

export const extractApiKey = <T extends Request>(
  req: T
): string | undefined => {
  const apiKey = req.headers['x-api-key'] || req.headers['api-key'];
  if (Array.isArray(apiKey)) {
    throw new APIError('Only specify api-key one time', 401);
  }
  return apiKey;
};

const extractAuthorizationHeader = <T extends Request>(
  req: T
): string | undefined => {
  const { authorization } = req.headers;
  if (Array.isArray(authorization)) {
    throw new APIError("Multiple 'Authorization' headers provided", 401);
  }
  return authorization;
};

export const extractAuthHeaders = <T extends Request>(
  req: T
): {
  Authorization: string | undefined;
  apiKey: string | undefined;
  authScheme: AuthScheme | undefined;
} => {
  const Authorization = extractAuthorizationHeader(req);
  const apiKey = extractApiKey(req);

  let authScheme: AuthScheme | undefined;
  if (Authorization) {
    authScheme = { accessToken: Authorization.split('Bearer ')[1] };
  } else if (apiKey) {
    authScheme = { apiKey };
  }

  return { Authorization, apiKey, authScheme };
};