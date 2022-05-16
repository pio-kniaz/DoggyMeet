import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};
