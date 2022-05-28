import type { Request, Response, NextFunction } from 'express';

import { ErrorException } from '@utils/error-handler/error-exception';
import { fieldValidation } from '@utils/field-validation/fieldValidation';
import { errorCodeName } from '@const/error-code-name';
import { createJWT } from '@/utils/jwt/createJWT';
import { setJWTCookie } from '@/utils/jwt/jwtCookies';
import { User } from '@/models/User';

import { loginValidationSchema } from './validation';

export const loginController = async (
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
        fieldsError: [fieldValidation(validationErrors)],
      })
    );
  }
  try {
    const currentUser = await User.findByCredentials(req.body);
    const accessToken = createJWT({
      type: 'accessToken',
      data: {
        userInfo: {
          id: currentUser._id,
          email: currentUser.email,
          name: currentUser.name,
        },
      },
    });

    const refreshToken = createJWT({
      type: 'refreshToken',
      data: {
        userInfo: {
          id: currentUser._id,
          email: currentUser.email,
          name: currentUser.name,
        },
      },
    });

    currentUser.refreshToken = refreshToken;

    await currentUser.save();
    setJWTCookie({ refreshToken, res });

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    return next(error);
  }
};
