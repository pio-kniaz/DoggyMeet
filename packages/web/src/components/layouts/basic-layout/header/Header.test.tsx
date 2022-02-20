import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import Header from '@components/layouts/basic-layout/header/Header';
import { renderWithClient } from '@/utils/tests/createWrapper';

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
      const signup = screen.getByRole('button', { name: /zarejestruj/i });
      expect(signup).toBeInTheDocument();
    });
    it.todo('Should open sing up modal after sign up button click');
  });
  describe('Signin visibility / interaction', () => {
    it('Should render sing in button', () => {
      renderWithClient(<Header />);
      const signin = screen.getByRole('button', { name: /zaloguj/i });
      expect(signin).toBeInTheDocument();
    });
    it.todo('Should open sing in modal after sign in button click');
  });
});
