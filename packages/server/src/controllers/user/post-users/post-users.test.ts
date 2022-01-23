/* eslint-disable security/detect-object-injection */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import supertest from 'supertest';
import mongoose from 'mongoose';

import { validationMessage } from '@const/index';
import app from '@/app';

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

beforeAll((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB', () => done());
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

describe('POST /api/users', () => {
  describe('Add new users', () => {
    it('Should add new user and returns correct response', async () => {
      const dataPayload = {
        name: 'Piotr',
        email: '123@doggyMeet-test.pl',
        password: 'JSON',
      };
      await supertest(app)
        .post('/api/users')
        .send(dataPayload)
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBe(true);
          expect(response.body.user._id).toBeTruthy();
          expect(response.body.user.name).toBe('Piotr');
          expect(response.body.user.email).toBe('123@doggyMeet-test.pl');
        });
    });
    it('Should check max length fields validation', async () => {
      const payload = {
        name: 'TOOOLONGTOOOLONGTOOOLONGTOOOLONGTOOOLONGTOOOLONGTOOOLONGTOOOLONG',
      };
      for (let i = 0; i < Object.keys(payload).length; i += 1) {
        const field = Object.keys(payload)[i];
        // eslint-disable-next-line no-await-in-loop
        const { statusCode, body } = await supertest(app)
          .post('/api/users')
          .send(payload);
        expect(statusCode).toBe(400);
        expect(body.metaData.fieldsError[field]).toBe(
          'length must be less than or equal to 30 characters long'
        );
        expect(body.name).toBe('ClientError');
      }
    });
    it('Should check required fields validation', async () => {
      const fields = {
        name: '',
        email: '',
        password: '',
      };
      for (let i = 0; i < Object.keys(fields).length; i += 1) {
        const field = Object.keys(fields)[i];
        // eslint-disable-next-line no-await-in-loop
        const { statusCode, body } = await supertest(app)
          .post('/api/users')
          .send({});
        expect(statusCode).toBe(400);
        expect(body.metaData.fieldsError[field]).toBe('required');
        expect(body.name).toBe('ClientError');
      }
    });
    it('Should check empty fields validation', async () => {
      const fieldsWithErrors = [
        {
          field: 'name',
          error: validationMessage.notEmpty,
        },
        {
          field: 'email',
          error: validationMessage.notEmpty,
        },
        {
          field: 'password',
          error: validationMessage.notEmpty,
        },
      ];
      const payload = fieldsWithErrors.reduce((acc, elem) => {
        acc[elem.field] = '';
        return acc;
      }, {} as { [field: string]: string });

      for (let i = 0; i < fieldsWithErrors.length; i += 1) {
        const { field, error } = fieldsWithErrors[i];
        // eslint-disable-next-line no-await-in-loop
        const { statusCode, body } = await supertest(app)
          .post('/api/users')
          .send(payload);
        expect(statusCode).toBe(400);
        expect(body.metaData.fieldsError[field]).toBe(error);
        expect(body.name).toBe('ClientError');
      }
    });
    describe('email field', () => {
      it('Should return error with correct message when email has been already exists', async () => {
        const dataPayload = {
          name: 'Piotr',
          email: '123@doggyMeet-test.pl',
          password: '123',
        };
        await supertest(app).post('/api/users').send(dataPayload);
        const { statusCode, body } = await supertest(app)
          .post('/api/users')
          .send(dataPayload);
        expect(statusCode).toBe(400);
        expect(body).toEqual({
          status: 400,
          metaData: {
            fieldsError: [
              {
                email: 'Email already exists',
              },
            ],
          },
          name: 'ClientError',
        });
      });
      it('Should return correct response when email is invalid', async () => {
        const dataPayload = {
          name: 'Piotr',
          email: 'invalidEmial',
          password: '123',
        };
        const { statusCode, body } = await supertest(app)
          .post('/api/users')
          .send(dataPayload);
        expect(statusCode).toBe(400);
        expect(body.metaData.fieldsError.email).toBe(validationMessage.email);
        expect(body.name).toBe('ClientError');
      });
    });
  });
});
