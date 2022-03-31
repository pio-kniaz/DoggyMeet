import type { Response } from 'express';
import { config } from '@/config';

interface ISetJWTCookie {
  refreshToken: string;
  res: Response;
}
export const setJWTCookie = ({ refreshToken, res }: ISetJWTCookie) => {
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
    // path: '/api/auth/refresh-token',
  });
};
export const clearJWTCookie = (res: Response) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: config.NODE_ENV === 'production',
    // path: '/api/auth/refresh-token',
  });
};
