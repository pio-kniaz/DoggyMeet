import type { Request, Response } from 'express';

export const postUsers = (req: Request, res: Response) => {
  console.log(req, res);
  console.log('object');
};
