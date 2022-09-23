import { NextFunction, Request, Response } from "express";
import { AuthScheme, Project } from "middleware/auth/types";

type AuthMiddlewareContext = {
  user: DecodedAuthToken;
  authScheme: AuthScheme;
};

export type Middleware<T extends Request, R = void> = (
  req: T,
  res: Response,
  next: NextFunction
) => R;

export type AuthenticatedRequest = Request & AuthMiddlewareContext;

export type RequestWithProject<T = AuthenticatedRequest> = T & {
  project: string;
};

export type DecodedAuthToken = {
  user: string;
  email: string;
  loggedIn: boolean;
  project: string;
  projectId: number;
  projects: Project[],
};

export type LoginStatusResponse = {
  data: DecodedAuthToken;
};