import { Request, Response, NextFunction } from 'express';
import { errorCodeName } from '@const/index';
import { ErrorException } from '@utils/error-handler/error-exception';
import { logger } from '@/utils/logger/logger';

const stringifyError = (err: unknown, filter: null, space: string) => {
  const plainObject: {
    [key: string]: unknown;
  } = {};
  if (err instanceof ErrorException) {
    Object.getOwnPropertyNames(err).forEach((key) => {
      plainObject[`${key}`] =
        err[`${key as 'stack' | 'message' | 'name' | 'metaData'}`];
    });
  }
  return JSON.stringify(plainObject, filter, space);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (err instanceof ErrorException) {
    // For handled Operational Errors
    res.status(err.status as number).send(err);
  } else {
    // For unhandled Programmer Errors
    res.status(500).send({ code: errorCodeName.UnknownError, status: 500 });
  }
  logger.error(
    // eslint-disable-next-line prettier/prettier
    `METHOD: ${req.method} ERROR: ${stringifyError(err, null, '')} PATH: ${req.path} IP: ${req.ip}`
  );
};
