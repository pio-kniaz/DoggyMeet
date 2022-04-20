import React from 'react';
import { screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Api } from '@services/index';

import Routes from '@routes/Routes';
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
  it('Should render Loader and then AuthenticatedRoutes', async () => {
    const setUserSpy = jest.spyOn(authSlice, 'setUser');
    mock.onPost('auth/refresh-token').reply(200, {
      accessToken: 'fakeAccessToken',
    });
    renderWithClient(<Routes />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeVisible();
    const UnAuthenticatedRoutes = await screen.findByTestId('authenticatedRoutes');
    expect(setUserSpy).toHaveBeenNthCalledWith(1, {
      accessToken: 'fakeAccessToken',
    });
    expect(UnAuthenticatedRoutes).toBeVisible();
    setUserSpy.mockRestore();
  });
  it('Should render Loader and then UnAuthenticatedRoutes', async () => {
    const logoutSpy = jest.spyOn(authSlice, 'logout');
    mock.onPost('auth/refresh-token').reply(403);
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
