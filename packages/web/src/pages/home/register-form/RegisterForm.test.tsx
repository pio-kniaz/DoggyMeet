import React from 'react';
import {screen, fireEvent} from '@testing-library/react';

import RegisterForm from './RegisterForm';
import {renderWithClient} from '@/utils/tests/createWrapper';

describe('RegisterFormComponent tests', () => {
  test('Should render title', () => {
    renderWithClient(<RegisterForm />);
    const title = screen.getByText('Create Account');
    expect(title).toBeInTheDocument();
  });
  describe('Submit button', () => {
    test('Should render submit button', () => {
      renderWithClient(<RegisterForm />);
      const submit = screen.getByRole('button', {name: /submit/i});
      expect(submit).toBeInTheDocument();
    });
    test('Should render submit button with correct attributes', () => {
      renderWithClient(<RegisterForm />);
      const submit = screen.getByRole('button', {name: /submit/i});
      expect(submit).toHaveAttribute('type', 'submit');
      expect(submit).toBeEnabled();
    });
    test('Should render disabled button with loading status after valid form submitted', async () => {
      renderWithClient(<RegisterForm />);
      const nameInput = screen.getByRole('textbox', {name: /name/i});
      const emailInput = screen.getByRole('textbox', {name: /email/i});
      const passwordInput = screen.getByLabelText('Password');
      const submit = screen.getByRole('button', {name: /submit/i});

      fireEvent.change(nameInput, {target: {value: '123'}});
      fireEvent.change(emailInput, {target: {value: 'xxcasdasdasd@op.pl'}});
      fireEvent.change(passwordInput, {target: {value: '123'}});
      fireEvent.click(submit);

      const submitAfterClick = await screen.findByRole('button', {
        name: /loading\.\.\. submit/i,
      });
      expect(submitAfterClick).toBeInTheDocument();
      expect(submitAfterClick).toBeDisabled();
    });
  });
  describe('Input name', () => {
    test('Should render name input', () => {
      renderWithClient(<RegisterForm />);
      const nameInput = screen.getByRole('textbox', {name: /name/i});
      expect(nameInput).toBeInTheDocument();
    });
    test('Should render name input with empty value and correct attributes', () => {
      renderWithClient(<RegisterForm />);
      const nameInput = screen.getByRole('textbox', {name: /name/i});
      expect(nameInput).toHaveValue('');
      expect(nameInput).toHaveAttribute('type', 'text');
    });
    test('Should display an error after submit form', async () => {
      renderWithClient(<RegisterForm />);

      const submit = screen.getByRole('button', {name: /submit/i});
      fireEvent.click(submit);
      const nameInput = await screen.findByRole('textbox', {name: /name/i});

      expect(nameInput).toBeInvalid();
    });
  });
  describe('Input email', () => {
    test('Should render email input', () => {
      renderWithClient(<RegisterForm />);
      const emailInput = screen.getByRole('textbox', {name: /email/i});
      expect(emailInput).toBeInTheDocument();
    });
    test('Should render email input with empty value and correct attributes', () => {
      renderWithClient(<RegisterForm />);
      const emailInput = screen.getByRole('textbox', {name: /email/i});
      expect(emailInput).toHaveValue('');
      expect(emailInput).toHaveAttribute('type', 'text');
    });
    test('Should display an error after submit form', async () => {
      renderWithClient(<RegisterForm />);

      const submit = screen.getByRole('button', {name: /submit/i});
      fireEvent.click(submit);
      const emailInput = await screen.findByRole('textbox', {name: /email/i});

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

      const submit = screen.getByRole('button', {name: /submit/i});
      fireEvent.click(submit);
      const passwordInput = await screen.findByLabelText('Password');

      expect(passwordInput).toBeInvalid();
    });
  });
});
