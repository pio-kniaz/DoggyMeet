/* eslint-disable import/no-extraneous-dependencies */
import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '@/app';
import { config } from '@/config';

export class TestDB {
  private static readonly userName = config.TEST_USER;

  private static readonly email = config.TEST_USER_EMAIL;

  private static password = config.TEST_USER_PASSWORD;

  private constructor() {} //eslint-disable-line

  static async initDB() {
    if (typeof config.TEST_DB !== 'string') {
      throw new Error('No testDbUri provided');
    }
    await mongoose.connect(config.TEST_DB);
  }

  static async dropDB() {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  }

  static async createTestUser() {
    return supertest(app).post('/api/users').send({
      name: TestDB.userName,
      email: TestDB.email,
      password: TestDB.password,
    });
  }

  static async signinTestUser() {
    return supertest(app).post('/api/auth/login').send({
      email: TestDB.email,
      password: TestDB.password,
    });
  }

  static async getTestUserToken(): Promise<string> {
    await TestDB.createTestUser();
    const data = await TestDB.signinTestUser();
    return data.body.accessToken;
  }
}
