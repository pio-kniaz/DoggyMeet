import { Router } from 'express';
import type { IVerifyJWTRequest } from '@interfaces/index';

import { verifyJWT } from '@/middlewares/verifyJWT/verifyJWT';
import { createUserController } from '@/controllers/users/create-user/createUserController';

const userRouter = Router();

userRouter.route('/').post(createUserController);
userRouter.route('/').get(verifyJWT, (req: IVerifyJWTRequest, res) => {
  console.log(req.user, 'req');
  return res.sendStatus(200);
});

export default userRouter;
