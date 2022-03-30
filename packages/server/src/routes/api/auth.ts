import { Router } from 'express';
import { login } from '@controllers/auth/login/login';

const authRouter = Router();

authRouter.route('/login').post(login);

export default authRouter;
