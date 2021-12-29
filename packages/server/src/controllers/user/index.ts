import { Request, Response, NextFunction } from 'express';
import { errorCodeName } from '@const/index';
import { postUsers } from '@/controllers/user/post-users';
import { ErrorException } from '@/utils/error-handler/error-exception';

export const userController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (req.method) {
    case 'POST':
      return postUsers(req, res, next);
    default:
      return next(new ErrorException(errorCodeName.MethodNotAllowed));
  }
};
