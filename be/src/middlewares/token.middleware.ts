import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

export const validateToken = (req: Request & {authenticated: boolean}, res: Response, next: NextFunction) => {
    const accessToken = req.cookies['access-token'];
  
    if (!accessToken)
      return res.status(400).json({ error: 'User not Authenticated!' });
  
    try {
      const validToken = verify(accessToken, 'jwtsecretplschange');
      if (validToken) {
        req.authenticated = true;
        return next();
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  };