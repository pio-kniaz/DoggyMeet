import React from 'react';
import MockAdapter from 'axios-mock-adapter';

import { screen, fireEvent, waitFor } from '@testing-library/react';

import Header from '@/components/layouts/header/Header';
import { renderWithClient } from '@/utils/tests/createWrapper';
import * as modalSlice from '@/redux/modal/modal.slice';
import * as authSlice from '@/redux/auth/auth.slice';
import { Api } from '@/utils/services/api';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    ...originalModule,
    useNavigate: () => mockedUsedNavigate,
  };
});

describe('Header component tests', () => {
  it('Should render Header component', () => {
    renderWithClient(<Header />);
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });
  describe('Logo visibility / interaction', () => {
    it('Should render logo with correct attribute', () => {
      renderWithClient(<Header />);
      const logo = screen.getByRole('link', { name: /doggy meet/i });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('href', '/');
    });
    it('Should navigate to root after logo click', async () => {
      const initialRoute = '/not-found';
      const { history } = renderWithClient(<Header />, { route: initialRoute });
      const logo = screen.getByRole('link', { name: /doggy meet/i });
      expect(history.location.pathname).toBe(initialRoute);
      fireEvent.click(logo);
      expect(history.location.pathname).toBe('/');
    });
  });
  describe('Signup visibility / interaction basic header', () => {
    it('Should render sing up button', () => {
      renderWithClient(<Header type="basic" />);
      const signup = screen.getByRole('button', { name: /register/i });
      expect(signup).toBeInTheDocument();
    });
    it('Should trigger open signup modal after sign up button click', async () => {
      const spyOpenModal = jest.spyOn(modalSlice, 'openModal');
      renderWithClient(<Header type="basic" />);
      const signup = screen.getByRole('button', { name: /register/i });
      fireEvent.click(signup);
      expect(spyOpenModal).toBeCalledWith({
        modalType: modalSlice.ModalTypes.SIGN_UP,
      });
      spyOpenModal.mockRestore();
    });
  });
  describe('Signin visibility / interaction basic header', () => {
    it('Should render sing in button', () => {
      renderWithClient(<Header type="basic" />);
      const signinButton = screen.getByRole('button', { name: /login/i });
      expect(signinButton).toBeInTheDocument();
    });
    it('Should open signin modal after login button click', () => {
      const spyOpenModal = jest.spyOn(modalSlice, 'openModal');
      renderWithClient(<Header type="basic" />);
      const signinButton = screen.getByRole('button', { name: /login/i });
      fireEvent.click(signinButton);
      expect(spyOpenModal).toBeCalledWith({
        modalType: modalSlice.ModalTypes.SIGN_IN,
      });
      spyOpenModal.mockRestore();
    });
  });
  describe('Logout visibility / interaction main header', () => {
    const mock = new MockAdapter(Api.getPrivateInstance(), {
      onNoMatch: 'throwException',
    });
    beforeAll(() => {
      mock.reset();
    });
    beforeEach(() => {
      mock.resetHistory();
    });
    it('Should render logout button', () => {
      renderWithClient(<Header type="main" />);
      const logoutButton = screen.getByRole('button', { name: /log out/i });
      expect(logoutButton).toBeInTheDocument();
    });
    it('Should logout button be disabled trigger clearAccessToken and redirect to main route when logout API call success', async () => {
      const clearAccessToken = jest.spyOn(authSlice, 'clearAccessToken');
      renderWithClient(<Header type="main" />);
      mock.onPost('/auth/logout').reply(200, {
        success: true,
      });
      const logoutButton = screen.getByRole('button', { name: /log out/i });
      fireEvent.click(logoutButton);
      await waitFor(() => {
        expect(logoutButton).toBeDisabled();
      });
      expect(clearAccessToken).toBeCalled();
      expect(mockedUsedNavigate).toBeCalledWith('/', { replace: true });
      clearAccessToken.mockRestore();
    });
    it('Should logout button be disabled and display error toast when logout API call fails', async () => {
      renderWithClient(<Header type="main" />);
      mock.onPost('/auth/logout').reply(400);
      const logoutButton = screen.getByRole('button', { name: /log out/i });
      fireEvent.click(logoutButton);
      await waitFor(() => {
        expect(logoutButton).toBeDisabled();
      });
      const alert = await screen.findByRole('alert');
      expect(alert).toBeInTheDocument();
    });
  });
});
