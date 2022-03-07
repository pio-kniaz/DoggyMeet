import { getMockReq, getMockRes } from '@jest-mock/express';
import { errorHandler } from '@/middlewares/error-handler/error-handler';
import { ErrorException } from '@/utils/error-handler/error-exception';
import { errorCodeName } from '@/const';
import { logger } from '@/utils/logger/logger';

describe('errorNoMatch tests', () => {
  it('should triggers Operational error', () => {
    const req = getMockReq({
      path: '/operational-error',
    });
    const { res, next } = getMockRes();
    errorHandler(new ErrorException(errorCodeName.ClientError), req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith(
      new ErrorException(errorCodeName.ClientError)
    );
  });
  it('should trigger Programmer error', () => {
    const req = getMockReq({
      path: '/programmer-error',
    });
    const { res, next } = getMockRes();
    errorHandler(new Error(), req, res, next);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledWith({
      code: errorCodeName.UnknownError,
      status: 500,
    });
  });
  it('should trigger logger if error occurs', () => {
    const spyLogger = jest.spyOn(logger, 'error');

    const req = getMockReq({
      method: 'POST',
      path: '/logger-error',
    });
    const { res, next } = getMockRes();
    errorHandler(new Error('Something bad happened'), req, res, next);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledWith({
      code: errorCodeName.UnknownError,
      status: 500,
    });
    expect(spyLogger).toHaveBeenCalled();
  });
});
