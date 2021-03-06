import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Signup from './Signup';
import { renderWithClient } from '@/utils/tests/createWrapper';
import * as modalSlice from '@/redux/modal/modal.slice';

describe('Signup component test', () => {
  it('Should render heading', () => {
    renderWithClient(<Signup />);
    const title = screen.getByText('Sign up');
    expect(title).toBeInTheDocument();
  });
  it('Should render subtitle', () => {
    renderWithClient(<Signup />);
    const subtitle = screen.getByText('to enjoy all of our cool features');
    expect(subtitle).toBeInTheDocument();
  });
  it('Should render Already a user?', () => {
    renderWithClient(<Signup />);
    const text = screen.getByText('Already a user?');
    expect(text).toBeInTheDocument();
  });
  it('Should render login button', () => {
    renderWithClient(<Signup />);
    const button = screen.getByRole('button', { name: /login/i });
    expect(button).toBeInTheDocument();
  });
  it('Should open login modal after Login button click', () => {
    const openLoginModalSpy = jest.spyOn(modalSlice, 'openModal');
    renderWithClient(<Signup />);
    const button = screen.getByRole('button', { name: /login/i });
    fireEvent.click(button);
    expect(openLoginModalSpy).toBeCalledWith({
      modalType: modalSlice.ModalTypes.SIGN_IN,
    });
  });
});
