import { Response, NextFunction } from 'express';
import type { IVerifyJWTRequest, IUser } from '@interfaces/index';
import pick from 'lodash/pick';

import { User } from '@models/User';
import { ErrorException } from '@utils/error-handler/error-exception';
import { errorCodeName } from '@const/index';

export async function currentUserController(
  req: IVerifyJWTRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user?.id) {
    return next(new ErrorException(errorCodeName.Unauthenticated));
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new ErrorException(errorCodeName.UnknownError));
    }
    const userData: Pick<
      IUser,
      '_id' | 'name' | 'email' | 'createdAt' | 'updatedAt'
    > = {
      ...pick(user, ['_id', 'name', 'email', 'createdAt', 'updatedAt']),
    };

    return res.status(200).json({ user: userData });
  } catch (error) {
    return next(error);
  }
}
