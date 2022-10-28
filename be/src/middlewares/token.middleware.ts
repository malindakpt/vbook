import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.originalUrl === "/user/signIn") {
    next();
  } else {
    const accessToken = req.cookies["access-token"];
    if (!accessToken)
      return res.status(400).json({ error: "User not Authenticated!" });

    try {
      const validToken = verify(accessToken, "jwtsecretplschange");
      if (validToken) {
        // @ts-ignore
        req.authenticated = true;
        return next();
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
};
