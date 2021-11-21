import { Router } from 'express';
import userRouter from '@/routes/api/user';

const routes = Router();

routes.use('/user', userRouter);

export default routes;
