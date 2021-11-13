import { Router } from 'express';
import exampleRouter from '@/routes/api/exampleRouter';

const routes = Router();

routes.use('/example', exampleRouter);

export default routes;
