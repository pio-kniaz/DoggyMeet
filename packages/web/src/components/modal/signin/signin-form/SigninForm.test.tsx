import React from 'react';
import MockAdapter from 'axios-mock-adapter';

import SigninForm from '@components/modal/signin/signin-form/SigninForm';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Api } from '@/utils/services/api';
import { renderWithClient } from '@/utils/tests/createWrapper';
import * as modalSlice from '@/redux/modal/modal.slice';
import * as authSlice from '@/redux/auth/auth.slice';

describe('SigninForm component tests', () => {
  describe('Input email', () => {
    test('Should render email input', () => {
      renderWithClient(<SigninForm />);
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      expect(emailInput).toBeInTheDocument();
    });
    test('Should render email input with empty value and correct attributes', () => {
      renderWithClient(<SigninForm />);
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      expect(emailInput).toHaveValue('');
      expect(emailInput).toHaveAttribute('type', 'text');
    });
    test('Should display an error after submit form', async () => {
      renderWithClient(<SigninForm />);

      const submit = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submit);
      const emailInput = await screen.findByRole('textbox', { name: /email/i });

      expect(emailInput).toBeInvalid();
    });
  });
  describe('Input password', () => {
    test('Should render password input', () => {
      renderWithClient(<SigninForm />);
      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toBeInTheDocument();
    });
    test('Should render password input with empty value and correct attributes', () => {
      renderWithClient(<SigninForm />);
      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toHaveValue('');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
    test('Should display an error after submit form', async () => {
      renderWithClient(<SigninForm />);

      const submit = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submit);
      const passwordInput = await screen.findByLabelText('Password');

      expect(passwordInput).toBeInvalid();
    });
  });
  describe('Submit button', () => {
    it('Should render submit button with correct attributes', () => {
      renderWithClient(<SigninForm />);
      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
      expect(submitButton).toBeEnabled();
    });
  });
  describe('Login REST API', () => {
    const mock = new MockAdapter(Api.getInstance(), {
      onNoMatch: 'throwException',
    });

    beforeAll(() => {
      mock.reset();
    });
    beforeEach(() => {
      mock.resetHistory();
    });
    describe('Success login user', () => {
      it('Should submit button be disabled, display toast, reset form, close modal and setUser after successful login', async () => {
        const spyCloseModal = jest.spyOn(modalSlice, 'closeModal');
        const spySetUser = jest.spyOn(authSlice, 'setUser');
        renderWithClient(<SigninForm />);

        mock.onPost('/auth/login').reply(200, {
          accessToken: 'xxx123xxx',
        });

        const emailInput = screen.getByRole('textbox', { name: /email/i });
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        fireEvent.change(emailInput, { target: { value: 'xxxxxasd@op.pl' } });
        fireEvent.change(passwordInput, { target: { value: '1239890' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
          expect(submitButton).toBeDisabled();
        });

        expect(mock.history.post[0].data).toBe(
          JSON.stringify({
            email: 'xxxxxasd@op.pl',
            password: '1239890',
          }),
        );

        const successToast = await screen.findByRole('alert', {
          name: /login success/i,
        });
        expect(successToast).toBeInTheDocument();
        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
        expect(spyCloseModal).toBeCalledWith();
        expect(spySetUser).toBeCalledWith({ accessToken: 'xxx123xxx' });
        spyCloseModal.mockRestore();
        spySetUser.mockRestore();
      });
    });
    describe('Failure login user', () => {
      it('Should submit button be disabled, display server message in toast, persist form values after submit', async () => {
        renderWithClient(<SigninForm />);
        mock.onPost('/auth/login').reply(403, {
          status: 403,
          metaData: { message: 'Password not correct' },
          name: 'ClientError',
        });
        const emailInput = screen.getByRole('textbox', { name: /email/i });
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        fireEvent.change(emailInput, { target: { value: 'testEmail@op.pl' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } });
        fireEvent.click(submitButton);
        await waitFor(() => {
          expect(submitButton).toBeDisabled();
        });
        expect(mock.history.post[0].data).toBe(
          JSON.stringify({
            email: 'testEmail@op.pl',
            password: 'wrongPassword',
          }),
        );

        const errorToast = await screen.findByRole('alert', { name: /unable to login\./i });
        expect(errorToast).toHaveTextContent('Password not correct');
        await waitFor(() => {
          expect(submitButton).toBeEnabled();
        });
      });
      it('Should display default toast message when failure', async () => {
        renderWithClient(<SigninForm />);
        mock.onPost('/auth/login').reply(403, {
          status: 403,
          name: 'ClientError',
        });
        const emailInput = screen.getByRole('textbox', { name: /email/i });
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        fireEvent.change(emailInput, { target: { value: 'testEmail@op.pl' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } });
        fireEvent.click(submitButton);
        await waitFor(() => {
          expect(submitButton).toBeDisabled();
        });
        expect(mock.history.post[0].data).toBe(
          JSON.stringify({
            email: 'testEmail@op.pl',
            password: 'wrongPassword',
          }),
        );

        const errorToast = await screen.findByRole('alert', { name: /unable to login\./i });
        expect(errorToast).toHaveTextContent('Something went wrong');
        await waitFor(() => {
          expect(submitButton).toBeEnabled();
        });
      });
    });
  });
});
