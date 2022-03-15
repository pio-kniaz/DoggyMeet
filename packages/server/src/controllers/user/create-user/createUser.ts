import type { Request, Response, NextFunction } from 'express';
import type { IUser } from '@interfaces/index';
import { errorCodeName } from '@const/index';
import { ErrorException } from '@/utils/error-handler/error-exception';
import { fieldValidation } from '@/utils/field-validation/fieldValidation';

import { User } from '@/models/User';
import { addUserValidationSchema } from './validation';

// @desc Create user
// @route POST /api/users
// @access public
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error: validationErrors } = addUserValidationSchema.validate(
    req.body,
    {
      abortEarly: false,
    }
  );
  if (validationErrors) {
    return next(
      new ErrorException(errorCodeName.ClientError, {
        fieldsError: fieldValidation(validationErrors),
      })
    );
  }
  try {
    const newUser = new User({
      ...req.body,
      password: await User.setPassword(req.body.password),
    });
    await newUser.save();

    const { name, email, _id } = newUser;

    const newUserResponse: Pick<IUser, 'name' | 'email'> & {
      _id: string;
    } = {
      _id,
      name,
      email,
    };

    return res.status(200).json({
      success: true,
      user: newUserResponse,
    });
  } catch (error) {
    if (error?.code === 11000 && error?.keyValue?.email) {
      return next(
        new ErrorException(errorCodeName.ClientError, {
          fieldsError: [
            {
              [Object.keys(error.keyValue)[0]]: 'Email already exists',
            },
          ],
        })
      );
    }
    return next(error);
  }
};
