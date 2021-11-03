import express from 'express';

import { config } from '@config/index';
import helmet from 'helmet';
import routes from '@/routes/api';

if (!process.env.PORT) {
  process.exit(1);
}
const app = express();

app.use(helmet());

app.use('/api', routes);

app.listen(config.PORT, () => {
  console.log(`Server is running at http://localhost:${config.PORT}`);
});
