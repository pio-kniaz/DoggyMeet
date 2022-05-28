import { Router } from 'express';
import userRouter from '@/routes/api/users';
import authRouter from '@/routes/api/auth';
import announcementsRouter from '@/routes/api/announcements';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/auth', authRouter);
routes.use('/announcements', announcementsRouter);

export default routes;
