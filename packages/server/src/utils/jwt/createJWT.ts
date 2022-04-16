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
      { expiresIn: '10s' }
    );
  }
  if (type === 'refreshToken') {
    return jwt.sign(
      {
        userInfo: data.userInfo,
      },
      `${config.REFRESH_TOKEN_SECRET}`,
      { expiresIn: '20s' }
    );
  }
  throw new Error('Wrong token type provided');
};
