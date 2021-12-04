import { Router } from 'express';

import { userController } from '@/controllers/user';

const userRouter = Router();

userRouter.all('/', userController);

export default userRouter;
