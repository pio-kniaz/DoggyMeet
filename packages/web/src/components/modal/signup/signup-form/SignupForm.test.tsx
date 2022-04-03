import React from 'react';
// import mockAxios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Api } from '@services/index';
import RegisterForm from './SignupForm';
import { renderWithClient } from '@/utils/tests/createWrapper';

describe('SignupForm component tests', () => {
  describe('Submit button', () => {
    it('Should render submit button', () => {
      renderWithClient(<RegisterForm />);
      const submit = screen.getByRole('button', { name: /submit/i });
      expect(submit).toBeInTheDocument();
    });
    it('Should render submit button with correct attributes', () => {
      renderWithClient(<RegisterForm />);
      const submit = screen.getByRole('button', { name: /submit/i });
      expect(submit).toHaveAttribute('type', 'submit');
      expect(submit).toBeEnabled();
    });
  });
  describe('Input name', () => {
    it('Should render name input', () => {
      renderWithClient(<RegisterForm />);
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      expect(nameInput).toBeInTheDocument();
    });
    it('Should render name input with empty value and correct attributes', () => {
      renderWithClient(<RegisterForm />);
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      expect(nameInput).toHaveValue('');
      expect(nameInput).toHaveAttribute('type', 'text');
    });
    it('Should display an error after submit form', async () => {
      renderWithClient(<RegisterForm />);

      const submit = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submit);
      const nameInput = await screen.findByRole('textbox', { name: /name/i });

      expect(nameInput).toBeInvalid();
    });
  });
  describe('Input email', () => {
    it('Should render email input', () => {
      renderWithClient(<RegisterForm />);
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      expect(emailInput).toBeInTheDocument();
    });
    it('Should render email input with empty value and correct attributes', () => {
      renderWithClient(<RegisterForm />);
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      expect(emailInput).toHaveValue('');
      expect(emailInput).toHaveAttribute('type', 'text');
    });
    it('Should display an error after submit form', async () => {
      renderWithClient(<RegisterForm />);

      const submit = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submit);
      const emailInput = await screen.findByRole('textbox', { name: /email/i });

      expect(emailInput).toBeInvalid();
    });
  });
  describe('Input password', () => {
    it('Should render password input', () => {
      renderWithClient(<RegisterForm />);
      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toBeInTheDocument();
    });
    it('Should render password input with empty value and correct attributes', () => {
      renderWithClient(<RegisterForm />);
      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toHaveValue('');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
    it('Should display an error after submit form', async () => {
      renderWithClient(<RegisterForm />);

      const submit = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submit);
      const passwordInput = await screen.findByLabelText('Password');

      expect(passwordInput).toBeInvalid();
    });
  });
  describe('Register REST API', () => {
    const mock = new MockAdapter(Api.getInstance(), {
      onNoMatch: 'throwException',
    });

    beforeAll(() => {
      mock.reset();
    });
    it('Should submit button be disabled, display toast and reset form after successful create user', async () => {
      renderWithClient(<RegisterForm />);

      mock.onPost('/users').reply(200, {
        data: {
          data: {
            success: true,
          },
        },
      });
      // mockAxios.post.mockImplementation(() =>
      //   Promise.resolve({
      // data: {
      // data: {
      // success: true,
      // },
      // },
      //   }),
      // );
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText('Password');
      const submit = screen.getByRole('button', { name: /submit/i });

      fireEvent.change(nameInput, { target: { value: '1239890' } });
      fireEvent.change(emailInput, { target: { value: 'xxxxxasd@op.pl' } });
      fireEvent.change(passwordInput, { target: { value: '1239890' } });
      fireEvent.click(submit);
      await waitFor(() => {
        expect(submit).toBeDisabled();
      });

      expect(mock.history.post[0].data).toBe(
        JSON.stringify({
          name: '1239890',
          email: 'xxxxxasd@op.pl',
          password: '1239890',
        }),
      );

      const successToast = await screen.findByRole('alert', {
        name: /account created\./i,
      });
      expect(successToast).toBeInTheDocument();
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
    it('Should submit button be disabled, display error toast and persist values form after failure create user', async () => {
      renderWithClient(<RegisterForm />);
      // mockAxios.post.mockImplementation(
      //   () =>
      //     // eslint-disable-next-line func-names
      //     new Promise(function (resolve, reject) {
      //       reject(new Error('something bad happened'));
      //     }),
      // );
      mock.onPost('/users').reply(400, {
        status: 400,
        name: 'ClientError',
      });
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText('Password');
      const submit = screen.getByRole('button', { name: /submit/i });

      fireEvent.change(nameInput, { target: { value: '1239890' } });
      fireEvent.change(emailInput, { target: { value: 'xxxxxasd@op.pl' } });
      fireEvent.change(passwordInput, { target: { value: '1239890' } });
      fireEvent.click(submit);
      await waitFor(() => {
        expect(submit).toBeDisabled();
      });
      const errorToast = await screen.findByRole('alert', {
        name: /account not created\./i,
      });
      expect(errorToast).toBeInTheDocument();
      expect(nameInput).toHaveValue('1239890');
      expect(emailInput).toHaveValue('xxxxxasd@op.pl');
      expect(passwordInput).toHaveValue('1239890');
    });
    it('Should throw an form validation message that Email already exists', async () => {
      renderWithClient(<RegisterForm />);
      mock.onPost('/users').reply(400, {
        status: 400,
        metaData: { fieldsError: [{ email: 'Email already exists' }] },
        name: 'ClientError',
      });
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText('Password');
      const submit = screen.getByRole('button', { name: /submit/i });

      fireEvent.change(nameInput, { target: { value: '1239890' } });
      fireEvent.change(emailInput, { target: { value: 'xxxxxasd@op.pl' } });
      fireEvent.change(passwordInput, { target: { value: '1239890' } });
      fireEvent.click(submit);
      await waitFor(() => {
        expect(submit).toBeDisabled();
      });
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
  });
});
