import { Router } from 'express';
import userRouter from '@/routes/api/user';

const routes = Router();

routes.use('/users', userRouter);

export default routes;
