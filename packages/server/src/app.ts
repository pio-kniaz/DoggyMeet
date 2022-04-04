import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import { corsOptions } from '@config/corsOptions';

import { credentials } from '@/middlewares/credentials/credentials';
import { errorHandler } from '@/middlewares/error-handler/error-handler';
import { errorNoMatch } from '@/middlewares/error-no-match/error-no-match';
import routes from '@/routes/api';

if (!process.env.PORT) {
  process.exit(1);
}
const app = express();

app.use(
  morgan((tokens, req, res) => {
    return [
      chalk.green(tokens.method(req, res)),
      chalk.blue(tokens.url(req, res)),
      chalk.yellow(tokens.status(req, res)),
      chalk.cyan(tokens.res(req, res, 'content-length')),
      '-',
      chalk.red(`${tokens['response-time'](req, res)} ms`),
    ].join(' ');
  })
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));

app.use('/api', routes);

app.use(errorNoMatch);
app.use(errorHandler);

export default app;
