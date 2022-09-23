export const getAuthorizationHeader = (
  token: string
): Record<string, string> => ({
  Authorization: `Bearer ${token}`,
});

export const getHeaders = (
  token: string
): Record<string, Record<string, string>> => ({
  headers: getAuthorizationHeader(token),
});

export const extractToken = (authorization = ''): string =>
  authorization.replace(/^Bearer /, '');
