import { Router } from 'express';

import { createUser } from '@controllers/user';

const userRouter = Router();

userRouter.post('/create', createUser);

export default userRouter;
