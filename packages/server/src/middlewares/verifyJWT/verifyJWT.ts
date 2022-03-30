import type { Response, NextFunction } from 'express';
import type { IVerifyJWTRequest, JwtPayload } from '@interfaces/index';
import jwt from 'jsonwebtoken';

import { config } from '@config/index';

export const verifyJWT = (
  req: IVerifyJWTRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader, 'authHeader');
  if (!authHeader?.startsWith('Bearer ')) {
    return res.sendStatus(403);
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(
      token,
      `${config.ACCESS_TOKEN_SECRET}`
    ) as JwtPayload;
    req.user = decoded.userInfo;
  } catch (error) {
    console.log(error, 'error');
    return res.sendStatus(401);
  }
  return next();
};
