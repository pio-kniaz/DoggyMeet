import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { ErrorException } from '@utils/error-handler/error-exception';
import { fieldValidation } from '@utils/field-validation/fieldValidation';
import { errorCodeName } from '@const/error-code-name';
import { config } from '@config/index';
import { User } from '@/models/User';

import { loginValidationSchema } from './validation';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error: validationErrors } = loginValidationSchema.validate(req.body, {
    abortEarly: true,
  });
  if (validationErrors) {
    return next(
      new ErrorException(errorCodeName.ClientError, {
        fieldsError: fieldValidation(validationErrors),
      })
    );
  }
  try {
    const currentUser = await User.findByCredentials(req.body);
    const accessToken = jwt.sign(
      {
        userInfo: {
          id: currentUser._id,
          email: currentUser.email,
          name: currentUser.name,
        },
      },
      `${config.ACCESS_TOKEN_SECRET}`,
      { expiresIn: '5m' }
    );
    const refreshToken = jwt.sign(
      {
        id: currentUser._id,
      },
      `${config.REFRESH_TOKEN_SECRET}`,
      { expiresIn: '1d' }
    );

    currentUser.refreshToken = refreshToken;

    await currentUser.save();
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
      // path: '/api/refreshToken',
    });

    return res.status(200).json({
      accessToken,
      currentUser,
    });
  } catch (error) {
    return next(error);
  }
};
