import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import Header from '@components/layouts/basic-layout/header/Header';
import { renderWithClient } from '@/utils/tests/createWrapper';
import * as modalSlice from '@/redux/modal/modal.slice';

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
  describe('Signup visibility / interaction', () => {
    it('Should render sing up button', () => {
      renderWithClient(<Header />);
      const signup = screen.getByRole('button', { name: /register/i });
      expect(signup).toBeInTheDocument();
    });
    it('Should trigger open signup modal after sign up button click', async () => {
      const spyOpenModal = jest.spyOn(modalSlice, 'openModal');
      renderWithClient(<Header />);
      const signup = screen.getByRole('button', { name: /register/i });
      fireEvent.click(signup);
      expect(spyOpenModal).toBeCalledWith({
        modalType: modalSlice.ModalTypes.SIGN_UP,
      });
      spyOpenModal.mockRestore();
    });
  });
  describe('Signin visibility / interaction', () => {
    it('Should render sing in button', () => {
      renderWithClient(<Header />);
      const signinButton = screen.getByRole('button', { name: /login/i });
      expect(signinButton).toBeInTheDocument();
    });
    it('Should open signin modal after login button click', () => {
      const spyOpenModal = jest.spyOn(modalSlice, 'openModal');
      renderWithClient(<Header />);
      const signinButton = screen.getByRole('button', { name: /login/i });
      fireEvent.click(signinButton);
      expect(spyOpenModal).toBeCalledWith({
        modalType: modalSlice.ModalTypes.SIGN_IN,
      });
      spyOpenModal.mockRestore();
    });
  });
});
