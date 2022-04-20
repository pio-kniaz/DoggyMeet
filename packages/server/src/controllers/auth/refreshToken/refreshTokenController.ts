import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import type { JwtPayload } from '@interfaces/index';
import { setJWTCookie, clearJWTCookie } from '@/utils/jwt/jwtCookies';
import { User } from '@/models/User';
import { config } from '@/config';
import { createJWT } from '@/utils/jwt/createJWT';

// TODO: ADD TOKEN ROTATION;
export const refreshTokenController = async (req: Request, res: Response) => {
  const { cookies } = req;
  if (!cookies.jwt) {
    return res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;
  clearJWTCookie(res);
  try {
    const currentUser = await User.findOne({ refreshToken });
    if (!currentUser) {
      return res.sendStatus(403);
    }
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      `${config.REFRESH_TOKEN_SECRET}`
    ) as JwtPayload;
    if (decodedRefreshToken.userInfo.id !== currentUser._id.toString()) {
      return res.sendStatus(403);
    }
    const newAccessToken = createJWT({
      type: 'accessToken',
      data: {
        userInfo: {
          id: currentUser._id,
          email: currentUser.email,
          name: currentUser.name,
        },
      },
    });
    const newRefreshToken = createJWT({
      type: 'refreshToken',
      data: {
        userInfo: {
          id: currentUser._id,
          email: currentUser.email,
          name: currentUser.name,
        },
      },
    });
    currentUser.refreshToken = newRefreshToken;
    await currentUser.save();
    setJWTCookie({
      refreshToken: newRefreshToken,
      res,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.sendStatus(403);
  }
};
