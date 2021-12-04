import { Request, Response } from 'express';
import { userController } from './index';
import { postUsers } from '@/controllers/user/post-users';

jest.mock('@/controllers/user/post-users');

describe('userController result', () => {
  it('Should return postUsers when request method will be POST', () => {
    const mockedRequest = {
      method: 'POST',
    } as Request;
    const mockedResponse = {} as Response;
    userController(mockedRequest, mockedResponse);
    expect(postUsers).toBeCalledTimes(1);
  });
});
