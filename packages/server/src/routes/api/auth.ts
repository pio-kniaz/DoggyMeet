// @ts-nocheck

import { Router } from 'express';

const authRouter = Router();

authRouter.route('/login').post((req, res) => {
  return res.status(200).json({
    msg: 'Login successful',
  });
});

export default authRouter;
