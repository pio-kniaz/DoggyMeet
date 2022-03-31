import { Router } from 'express';
import { loginController } from '@controllers/auth/login/loginController';
import { refreshTokenController } from '@controllers/auth/refreshToken/refreshTokenController';
import { logoutController } from '@controllers/auth/logout/logoutController';
import { verifyJWT } from '@/middlewares/verifyJWT/verifyJWT';

const authRouter = Router();

authRouter.route('/login').post(loginController);
authRouter.route('/refresh-token').post(refreshTokenController);
authRouter.route('/logout').post(verifyJWT, logoutController);

export default authRouter;
