import React from 'react';
import { screen } from '@testing-library/react';

import HomePage from '@pages/home/HomePage';
import { renderWithClient } from '@/utils/tests/createWrapper';

describe('HomePageComponent tests', () => {
  it('Should render homepage container', () => {
    renderWithClient(<HomePage />);
    const homePage = screen.getByTestId('home-page');
    expect(homePage).toBeInTheDocument();
  });
  it('Should render children in HomePage', () => {
    renderWithClient(<HomePage />);
    const registerForm = screen.getByTestId('register-form');
    expect(registerForm).toBeInTheDocument();
  });
});
