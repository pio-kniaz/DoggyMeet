import type { Response, NextFunction } from 'express';
import { IVerifyJWTRequest } from '@interfaces/index';

import { User } from '@/models/User';
import { clearJWTCookie } from '@/utils/jwt/jwtCookies';

export const logoutController = async (
  req: IVerifyJWTRequest,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.cookies;
  if (!cookie) {
    return res.sendStatus(403);
  }
  const refreshToken = cookie.jwt;
  try {
    const currentUser = await User.findOne({ refreshToken });
    if (!currentUser) {
      return res.sendStatus(403);
    }
    if (currentUser.id.toString() !== req.user?.id) {
      return res.sendStatus(403);
    }
    currentUser.refreshToken = '';
    await currentUser.save();
    clearJWTCookie(res);
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};
