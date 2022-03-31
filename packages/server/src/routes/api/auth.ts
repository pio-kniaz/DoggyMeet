import { Router } from 'express';
import { login } from '@controllers/auth/login/login';
import { refreshTokenController } from '@controllers/auth/refreshToken/refreshTokenController';

const authRouter = Router();

authRouter.route('/login').post(login);
authRouter.route('/refresh-token').post(refreshTokenController);

export default authRouter;
