import mongoose from 'mongoose';
// import { config } from '../config';
import { config } from '@config/index';

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(`${config.MONGO_URI}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`.green.bold);
  } catch (error) {
    throw new Error(`Unable to connect to MongoDB: ${error}`);
  }
};
