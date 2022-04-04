import { CorsOptions } from 'cors';
import { allowedOrigins } from '@config/allowedOrigins';

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
} as CorsOptions;
