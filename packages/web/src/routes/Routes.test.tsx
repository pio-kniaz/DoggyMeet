import React from 'react';
import { screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import Routes from '@routes/Routes';
import { Api } from '@/utils/services/api';

import { renderWithClient } from '@/utils/tests/createWrapper';

import * as authSlice from '@/redux/auth/auth.slice';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Routes component tests', () => {
  const mock = new MockAdapter(Api.getInstance(), {
    onNoMatch: 'throwException',
  });
  const mockPrivate = new MockAdapter(Api.getPrivateInstance(), {
    onNoMatch: 'throwException',
  });
  it('Should render Loader and then AuthenticatedRoutes', async () => {
    const setAccessTokenSpy = jest.spyOn(authSlice, 'setAccessToken');
    const setUserSpy = jest.spyOn(authSlice, 'setUser');
    mock.onGet('auth/refresh-token').reply(200, {
      accessToken: 'fakeAccessToken',
    });
    mockPrivate.onGet('users/me').reply(200, {
      user: {
        _id: '_id',
        name: 'name',
        email: 'email',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    });
    renderWithClient(<Routes />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeVisible();
    const UnAuthenticatedRoutes = await screen.findByTestId('authenticatedRoutes');
    expect(setAccessTokenSpy).toHaveBeenNthCalledWith(1, {
      accessToken: 'fakeAccessToken',
    });
    expect(setUserSpy).toHaveBeenNthCalledWith(1, {
      _id: '_id',
      createdAt: 'createdAt',
      email: 'email',
      name: 'name',
      updatedAt: 'updatedAt',
    });
    expect(UnAuthenticatedRoutes).toBeVisible();
    setAccessTokenSpy.mockRestore();
    setUserSpy.mockRestore();
  });
  it('Should render Loader and then UnAuthenticatedRoutes', async () => {
    const logoutSpy = jest.spyOn(authSlice, 'clearAccessToken');
    mock.onGet('auth/refresh-token').reply(403);
    renderWithClient(<Routes />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeVisible();
    const UnAuthenticatedRoutes = await screen.findByTestId('unAuthenticatedRoutes');
    expect(logoutSpy).toHaveBeenNthCalledWith(1);
    expect(mockedUsedNavigate).toHaveBeenNthCalledWith(1, '/', { replace: true });
    expect(UnAuthenticatedRoutes).toBeVisible();
    logoutSpy.mockRestore();
  });
});
