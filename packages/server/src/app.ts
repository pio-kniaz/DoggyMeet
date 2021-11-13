import express from 'express';

import helmet from 'helmet';
import routes from '@/routes/api';

if (!process.env.PORT) {
  process.exit(1);
}
const app = express();

app.use(helmet());

app.use('/api', routes);

export default app;
