import React from 'react';
// import mockAxios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Api } from '@services/index';
import RegisterForm from './RegisterForm';
import { renderWithClient } from '@/utils/tests/createWrapper';

describe('RegisterFormComponent tests', () => {
  test('Should render title', () => {
    renderWithClient(<RegisterForm />);
    const title = screen.getByText('Create Account');
    expect(title).toBeInTheDocument();
  });
  describe('Submit button', () => {
    test('Should render submit button', () => {
      renderWithClient(<RegisterForm />);
      const submit = screen.getByRole('button', { name: /submit/i });
      expect(submit).toBeInTheDocument();
    });
    test('Should render submit button with correct attributes', () => {
      renderWithClient(<RegisterForm />);
      const submit = screen.getByRole('button', { name: /submit/i });
      expect(submit).toHaveAttribute('type', 'submit');
      expect(submit).toBeEnabled();
    });
  });
  describe('Input name', () => {
    test('Should render name input', () => {
      renderWithClient(<RegisterForm />);
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      expect(nameInput).toBeInTheDocument();
    });
    test('Should render name input with empty value and correct attributes', () => {
      renderWithClient(<RegisterForm />);
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      expect(nameInput).toHaveValue('');
      expect(nameInput).toHaveAttribute('type', 'text');
    });
    test('Should display an error after submit form', async () => {
      renderWithClient(<RegisterForm />);

      const submit = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submit);
      const nameInput = await screen.findByRole('textbox', { name: /name/i });

      expect(nameInput).toBeInvalid();
    });
  });
  describe('Input email', () => {
    test('Should render email input', () => {
      renderWithClient(<RegisterForm />);
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      expect(emailInput).toBeInTheDocument();
    });
    test('Should render email input with empty value and correct attributes', () => {
      renderWithClient(<RegisterForm />);
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      expect(emailInput).toHaveValue('');
      expect(emailInput).toHaveAttribute('type', 'text');
    });
    test('Should display an error after submit form', async () => {
      renderWithClient(<RegisterForm />);

      const submit = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submit);
      const emailInput = await screen.findByRole('textbox', { name: /email/i });

      expect(emailInput).toBeInvalid();
    });
  });
  describe('Input password', () => {
    test('Should render password input', () => {
      renderWithClient(<RegisterForm />);
      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toBeInTheDocument();
    });
    test('Should render password input with empty value and correct attributes', () => {
      renderWithClient(<RegisterForm />);
      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toHaveValue('');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
    test('Should display an error after submit form', async () => {
      renderWithClient(<RegisterForm />);

      const submit = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submit);
      const passwordInput = await screen.findByLabelText('Password');

      expect(passwordInput).toBeInvalid();
    });
  });
  describe('Login REST API', () => {
    const mock = new MockAdapter(Api.getInstance(), {
      onNoMatch: 'throwException',
    });

    beforeAll(() => {
      mock.reset();
    });
    test('Should submit button be disabled, display toast and reset form after successful create user', async () => {
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
    test('Should submit button be disabled, display error toast and persist values form after failure create user', async () => {
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
    test('Should throw an form validation message that Email already exists', async () => {
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
