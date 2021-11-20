import mongoose, { connect } from 'mongoose';
import { connectDb } from './index';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('database connection', () => {
  beforeEach(() => {
    (connect as jest.Mock).mockImplementation(() => ({
      connection: {
        host: 'localhost',
      },
    }));
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should connect database with correct URI', async () => {
    // Arrange
    await connectDb();
    // Act
    const mongooseConnectSpyOn = jest
      .spyOn(mongoose, 'connect')
      .mockImplementation(() => {
        return Promise.resolve(mongoose);
      });
    // Assert
    expect(mongooseConnectSpyOn).toHaveBeenNthCalledWith(
      1,
      'mongodb://localhost:27017/merg'
    );
  });
  it('should display correct message when successfully connected to db', async () => {
    // Arrange
    const consoleLogSpyOn = jest.spyOn(console, 'log');
    await connectDb();
    // Act
    const currentLogOutput = consoleLogSpyOn;
    // Assert
    expect(currentLogOutput).toHaveBeenNthCalledWith(
      1,
      `MongoDB Connected: localhost`.green.bold
    );
  });
  it('should thrown an error when can not connect to db', async () => {
    // Arrange
    jest.spyOn(mongoose, 'connect').mockImplementation(() => {
      return Promise.reject(new Error('Something bad happened'));
    });
    // Act
    // Assert
    await expect(connectDb()).rejects.toThrow(
      'Unable to connect to MongoDB: Error: Something bad happened'
    );
  });
});
