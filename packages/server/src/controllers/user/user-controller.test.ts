import { getMockReq, getMockRes } from '@jest-mock/express';
import { userController } from './index';
import { postUsers } from '@/controllers/user/post-users';
import { ErrorException } from '@/utils/error-handler/error-exception';
import { errorCodeName } from '@/const';

jest.mock('@/controllers/user/post-users');

describe('userController result', () => {
  it('Should return postUsers when request method will be POST', () => {
    const req = getMockReq({
      method: 'POST',
    });
    const { res, next } = getMockRes();
    userController(req, res, next);
    expect(postUsers).toBeCalledTimes(1);
  });
  test.each(['GET', 'DELETE', 'PATCH', 'PUT'])(
    'Should return ErrorException with MethodNotAllowed and stats 405 when method for %s',
    (input) => {
      const req = getMockReq({
        method: input,
      });
      const { res, next } = getMockRes();
      userController(req, res, next);
      expect(next).toBeCalledWith(
        new ErrorException(errorCodeName.MethodNotAllowed)
      );
    }
  );
});
