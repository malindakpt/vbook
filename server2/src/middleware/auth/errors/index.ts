import { ErrorRequestHandler, NextFunction, Response, Request } from 'express';

import { ExpressError, APIErrorDTO, CdfAPIErrorDTO } from './types';

export class APIError extends Error {
  public readonly status: string | number;

  constructor(message: string, status: string | number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export function cdfErrorDtoAsApiError(cdfErrorDTO: CdfAPIErrorDTO): APIError {
  return new APIError(cdfErrorDTO.error.message, cdfErrorDTO.error.code || 500);
}

type ErrorExtract = {
  status: number;
  data: APIErrorDTO;
  error: Error;
};

function extractMeaningfulError(expressError: ExpressError): ErrorExtract {
  let error = expressError;
  if (expressError.response) {
    const { status, data } = expressError.response;
    return { status, data, error };
  }

  let { status = 500, message } = expressError;
//   if (isCelebrate(expressError)) {
//     const { joi } = expressError;
//     status = 400;
//     message = joi.message;
//     error = joi;
//   }

  // Format error similar to the Cognite API for consistency
  return {
    error,
    status,
    data: { error: { status, message } },
  };
}

export const errorMiddleware: ErrorRequestHandler = (
  expressError: ExpressError,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (response.headersSent) {
    return next(expressError);
  }
  const { status, data, error } = extractMeaningfulError(expressError);

//   const logFunction = status >= 500 ? logger.error : logger.debug;
//   logFunction(error.message, {
//     stackTrace: error.stack,
//     errorName: error.name,
//     requestId: getRequestId(response),
//   });

  return response.status(status).json(data);
};

export const errors = {
  future: 'Invalid token. This token is only valid in the future',
  expired: 'Invalid token. This token is expired',
  idRequired: 'Legacy token detected, this middleware only accepts ID tokens',
  cannotDecode: 'Token was unable to be decoded',
  invalidID: 'Error validating OIDC ID token',
  invalidApp: 'Invalid token. This token was not intended for this app',
  invalidAccess: 'Error validating OIDC access token',
  invalidLegacy: 'Error validating Legacy token',
  invalidSigning: 'Token was incorrectly signed',
  invalidToken: 'Invalid credentials (bad token)',
  missingUser: 'Invalid credentials (Missing user)',
  missingProject: 'Invalid credentials (Missing projectId)',
  forbiddenProject:'The user cannot access the project specified',
  unknown: 'Unknown Auth error',
};