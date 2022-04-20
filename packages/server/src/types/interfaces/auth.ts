import type { Request } from 'express';

export interface IVerifyJWTRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface JwtPayload {
  userInfo: {
    id: string;
    email: string;
    name: string;
  };
}
