import { Router } from 'express';
import userRouter from '@/routes/api/users';
import authRouter from '@/routes/api/auth';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/auth', authRouter);

export default routes;
