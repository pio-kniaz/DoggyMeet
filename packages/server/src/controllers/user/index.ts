import { Request, Response } from 'express';
import { postUsers } from '@/controllers/user/post-users';

export const userController = (req: Request, res: Response) => {
  switch (req.method) {
    case 'POST':
      return postUsers(req, res);
    default:
      // TODO: ADD correct function to handle this case
      throw new Error('Invalid method');
  }
};
