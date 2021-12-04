import { Request, Response } from 'express';

export const userController = (req: Request, res: Response) => {
  switch (req.method) {
    default:
      return res.status(500).json({});
  }
};
