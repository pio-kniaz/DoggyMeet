import { getMockReq, getMockRes } from '@jest-mock/express';
import { errorHandler } from '@/middlewares/error-handler/error-handler';
import { ErrorException } from '@/utils/error-handler/error-exception';
import { errorCodeName } from '@/const';

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
});
