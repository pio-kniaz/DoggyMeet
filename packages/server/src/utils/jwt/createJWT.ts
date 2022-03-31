import jwt from 'jsonwebtoken';

import type { JwtPayload } from '@interfaces/index';
import { config } from '@/config';

interface ICreateJWT {
  data: JwtPayload;
  type: 'accessToken' | 'refreshToken';
}
export const createJWT = ({ type, data }: ICreateJWT) => {
  if (type === 'accessToken') {
    return jwt.sign(
      {
        userInfo: data.userInfo,
      },
      `${config.ACCESS_TOKEN_SECRET}`,
      { expiresIn: '2m' }
    );
  }
  if (type === 'refreshToken') {
    return jwt.sign(
      {
        userInfo: data.userInfo,
      },
      `${config.REFRESH_TOKEN_SECRET}`,
      { expiresIn: '1d' }
    );
  }
  throw new Error('Wrong token type provided');
};
