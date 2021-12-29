import type { ValidationError } from 'joi';
import { fieldValidation } from '@/utils/field-validation/fieldValidation';

describe('fieldValidation', () => {
  it('Should returns correct data when errors provided', () => {
    const errors = {
      _original: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        terms: '',
      },
      details: [
        {
          message: '"firstName" is not allowed to be empty',
          path: ['firstName'],
          type: 'string.empty',
          context: {
            label: 'firstName',
            value: '',
            key: 'firstName',
          },
        },
        {
          message: '"lastName" is not allowed to be empty',
          path: ['lastName'],
          type: 'string.empty',
          context: {
            label: 'lastName',
            value: '',
            key: 'lastName',
          },
        },
        {
          message: '"email" is not allowed to be empty',
          path: ['email'],
          type: 'string.empty',
          context: {
            label: 'email',
            value: '',
            key: 'email',
          },
        },
        {
          message: '"password" is not allowed to be empty',
          path: ['password'],
          type: 'string.empty',
          context: {
            label: 'password',
            value: '',
            key: 'password',
          },
        },
        {
          message: 'terms must be true',
          path: ['terms'],
          type: 'any.only',
          context: {
            valids: [true],
            label: 'terms',
            value: '',
            key: 'terms',
          },
        },
        {
          message: '"terms" must be a boolean',
          path: ['terms'],
          type: 'boolean.base',
          context: {
            label: 'terms',
            value: '',
            key: 'terms',
          },
        },
      ],
    } as ValidationError;
    expect(fieldValidation(errors)).toEqual({
      firstName: 'is not allowed to be empty',
      lastName: 'is not allowed to be empty',
      email: 'is not allowed to be empty',
      password: 'is not allowed to be empty',
      terms: 'must be a boolean',
    });
  });
});
