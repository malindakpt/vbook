import { NextFunction, Request, Response } from 'express';
import { Middleware } from 'types';

const asyncMiddleware =
  <RequestType extends Request, ResponseType = void>(
    fn: Middleware<RequestType, Promise<ResponseType>>
  ) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ): Middleware<RequestType, ResponseType> => {
    const response = fn(req as RequestType, res, next);
    return Promise.resolve(response).catch(next) as unknown as Middleware<
      Request,
      ResponseType
    >;
  };

export default asyncMiddleware;