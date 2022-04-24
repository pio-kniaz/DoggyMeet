import MockAdapter from 'axios-mock-adapter';

import * as authQueries from '@queries/auth/auth-queries';
import * as ApiService from '@/utils/services/api';
import * as authSlice from '@/redux/auth/auth.slice';

describe('Api privateInstance', () => {
  const privateInstanceMock = new MockAdapter(ApiService.Api.getPrivateInstance());

  beforeAll(() => {
    privateInstanceMock.reset();
  });
  it('Should add Authorization token to privateInstance if access token exits in auth store', () => {
    const authSelectorSpy = jest.spyOn(authSlice, 'authSelector');
    authSelectorSpy.mockReturnValueOnce({ accessToken: 'mockedTOken' });
    // @ts-ignore
    const result = ApiService.Api.getPrivateInstance().interceptors.request.handlers[0].fulfilled({ headers: {} });

    expect(authSelectorSpy.mock.calls.length).toBe(1);
    expect(result.headers).toEqual({ Authorization: 'Bearer mockedTOken' });
    authSelectorSpy.mockRestore();
  });
  it('Should not add Authorization token to privateInstance', () => {
    // @ts-ignore
    const result = ApiService.Api.getPrivateInstance().interceptors.request.handlers[0].fulfilled({ headers: {} });
    expect(result.headers).not.toHaveProperty('Authorization');
  });
  it('Should set new accessToken in refreshToken logic success', async () => {
    const setUserSpy = jest.spyOn(authSlice, 'setAccessToken');
    const getRefreshTokenSpy = jest.spyOn(authQueries.authMethods, 'refreshToken');
    getRefreshTokenSpy.mockResolvedValue({ accessToken: 'fakeAccessToken', success: true });
    privateInstanceMock.onGet('/get-some-data').reply(401);
    try {
      await ApiService.Api.getPrivateInstance().get('/get-some-data');
    } catch (error) {
      expect(getRefreshTokenSpy).toBeCalledTimes(1);
      expect(setUserSpy).toBeCalledTimes(1);
    }
    getRefreshTokenSpy.mockRestore();
    setUserSpy.mockRestore();
  });
  it('Should executes refreshToken API call if server returns 401 status code and clearAccessToken user when refreshToken failure', async () => {
    const getRefreshTokenSpy = jest.spyOn(authQueries.authMethods, 'refreshToken');
    getRefreshTokenSpy.mockRejectedValue(true);
    const logOutSpy = jest.spyOn(authSlice, 'clearAccessToken');

    privateInstanceMock.onGet('/get-some-data').reply(401);
    try {
      await ApiService.Api.getPrivateInstance().get('/get-some-data');
    } catch (error) {
      expect(getRefreshTokenSpy).toBeCalledTimes(1);
      expect(logOutSpy).toBeCalledTimes(1);
    }
    getRefreshTokenSpy.mockRestore();
    logOutSpy.mockRestore();
  });
  it('Should not executes refreshToken API call if server returns status code other than 401', async () => {
    const getRefreshTokenSpy = jest.spyOn(authQueries.authMethods, 'refreshToken');
    privateInstanceMock.onGet('/get-some-data').reply(403);
    try {
      await ApiService.Api.getPrivateInstance().get('/get-some-data');
    } catch (error) {
      expect(getRefreshTokenSpy).toBeCalledTimes(0);
    }
    getRefreshTokenSpy.mockRestore();
  });
});
