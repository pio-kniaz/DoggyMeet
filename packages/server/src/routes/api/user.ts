import { Router } from 'express';

// import { userController } from '@/controllers/user';
import { createUser } from '@/controllers/user/create-user/createUser';

const userRouter = Router();

userRouter.post('/', createUser);

export default userRouter;
