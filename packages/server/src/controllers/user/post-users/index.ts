/* eslint-disable no-unreachable */
import type { Request, Response, NextFunction } from 'express';
import type { IUser } from '@interfaces/index';
import { errorCodeName } from '@const/index';
import { User } from '@/models/User';
import { ErrorException } from '@/utils/error-handler/error-exception';
import { fieldValidation } from '@/utils/field-validation/fieldValidation';
import { addUserValidationSchema } from './validation';

export const postUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUserData = req.body;
  const { error: validationErrors } = addUserValidationSchema.validate(
    newUserData,
    {
      abortEarly: false,
    }
  );
  if (validationErrors) {
    console.log(JSON.stringify(validationErrors, null, 2), 'validationErrors');
    return next(
      new ErrorException(errorCodeName.ClientError, {
        fieldsError: fieldValidation(validationErrors),
      })
    );
  }

  try {
    const newUser = new User(newUserData);
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
