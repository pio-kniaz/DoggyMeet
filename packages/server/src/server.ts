import { config } from '@config/index';
import { connectDb } from '@/db/index';

import app from '@/app';

const initApp = async () => {
  try {
    await connectDb();
    app.listen(config.PORT, () => {
      console.log(
        `Server is running at http://localhost:${config.PORT}`.green.bold
      );
    });
  } catch (error) {
    console.log(`${error}`.red.bold);
    process.exit(1);
  }
};

initApp();
