import { Router } from 'express';
import type { IVerifyJWTRequest } from '@interfaces/index';

import { verifyJWT } from '@/middlewares/verifyJWT/verifyJWT';
import { createUser } from '@/controllers/users/create-user/createUser';

const userRouter = Router();

userRouter.route('/').post(createUser);
userRouter.route('/').get(verifyJWT, (req: IVerifyJWTRequest, res) => {
  console.log(req.user, 'req');
  return res.sendStatus(200);
});

export default userRouter;
