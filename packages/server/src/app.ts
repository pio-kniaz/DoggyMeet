import express from 'express';

import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from '@/middlewares/error-handler/error-handler';
import { errorNoMatch } from '@/middlewares/error-no-match/error-no-match';
import routes from '@/routes/api';

if (!process.env.PORT) {
  process.exit(1);
}
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.use(errorNoMatch);
app.use(errorHandler);

export default app;
