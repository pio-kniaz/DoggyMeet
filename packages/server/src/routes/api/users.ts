import { Router } from 'express';

import { createUser } from '@/controllers/users/create-user/createUser';

const userRouter = Router();

userRouter.route('/').post(createUser);

export default userRouter;
