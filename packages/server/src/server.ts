import { config } from '@config/index';
import app from '@/app';

app.listen(config.PORT, () => {
  console.log(`Server is running at http://localhost:${config.PORT}`);
});
