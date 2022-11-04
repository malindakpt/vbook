import { config } from "config";
import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.originalUrl === "/user/signIn" || req.originalUrl === "/user/signUp" || req.originalUrl === "/user/logout" || req.originalUrl === "/user/refreshToken") {
    next();
  } else {
    const accessToken = req.cookies["access-token"];
    if (!accessToken)
      return res.status(403).json({ error: "User not Authenticated!" });

    try {
      const validToken = verify(accessToken, config.accessTokenSecret);
      if (validToken) {
        // @ts-ignore
        req.authenticated = true;
        return next();
      }
    } catch (err) {
      return res.status(403).json(err);
    }
  }
};
