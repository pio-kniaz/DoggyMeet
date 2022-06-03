import type { Request, Response, NextFunction } from 'express';
import { allowedOrigins } from '@config/allowedOrigins';

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { origin } = req.headers;
  if (origin && allowedOrigins?.includes(origin)) {
    // @ts-ignore
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
};
