import { Router, Request, Response } from 'express';

const exampleRouter = Router();

exampleRouter.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'bolek' });
});

export default exampleRouter;
