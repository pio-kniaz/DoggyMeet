import { Request, Response, NextFunction } from 'express';
import { errorCodeName } from '@const/index';
import { ErrorException } from '@utils/error-handler/error-exception';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction
) => {
  console.log('Error handling middleware called...');
  console.log('Path:', req.path);
  console.error('Error occurred:', err);
  if (err instanceof ErrorException) {
    // For handled Operational Errors
    console.log('Error is known.');
    res.status(err.status as number).send(err);
  } else {
    // TODO: ADD LOGGER.
    // For unhandled Programmer Errors
    console.log('Error is unknown.');
    res.status(500).send({ code: errorCodeName.UnknownError, status: 500 });
  }
};
