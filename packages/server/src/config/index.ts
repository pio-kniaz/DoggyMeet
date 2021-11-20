// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import dotenv from 'dotenv';

colors.enable();
dotenv.config();

export const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};
