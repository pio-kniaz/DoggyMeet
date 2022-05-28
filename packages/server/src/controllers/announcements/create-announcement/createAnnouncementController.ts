import type { Response, NextFunction } from 'express';
import type { IVerifyJWTRequest } from '@interfaces/index';
import { Announcement } from '@models/Announcements';

import { ErrorException } from '@utils/error-handler/error-exception';
import { errorCodeName } from '@const/index';
import { addAnnouncementValidationSchema } from './validation';
import { fieldValidation } from '@/utils/field-validation/fieldValidation';

export const createAnnouncementController = async (
  req: IVerifyJWTRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.id) {
    return next(new ErrorException(errorCodeName.Unauthenticated));
  }
  const { error: validationErrors } = addAnnouncementValidationSchema.validate(
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
    const announcement = new Announcement({
      ...req.body,
      author: {
        id: req.user.id,
        name: req.user.name,
      },
    });
    await announcement.save();
    return res.status(201).json({
      success: true,
      announcement,
    });
  } catch (error) {
    return next(error);
  }
};
