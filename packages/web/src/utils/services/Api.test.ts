import * as ApiService from '@services/Api';
import * as authSlice from '@/redux/auth/auth.slice';

describe('Api privateInstance', () => {
  it('Should add Authorization token to privateInstance if access token exits in auth store', () => {
    const authSelectorSpy = jest.spyOn(authSlice, 'authSelector');
    authSelectorSpy.mockReturnValueOnce({ accessToken: 'mockedTOken' });
    // @ts-ignore
    const result = ApiService.Api.getPrivateInstance().interceptors.request.handlers[0].fulfilled({ headers: {} });

    expect(authSelectorSpy.mock.calls.length).toBe(1);
    console.log(result.headers, 'result.headers');
    expect(result.headers).toEqual({ Authorization: 'Bearer mockedTOken' });
    authSelectorSpy.mockRestore();
  });
  it('Should not add Authorization token to privateInstance', () => {
    // @ts-ignore
    const result = ApiService.Api.getPrivateInstance().interceptors.request.handlers[0].fulfilled({ headers: {} });
    expect(result.headers).not.toHaveProperty('Authorization');
  });
});
