import type { Request, Response } from 'express';
import type { IUser } from '@interfaces/index';
import { User } from '@/models/User';

export const postUsers = async (req: Request, res: Response) => {
  const newUserData = req.body;
  try {
    const newUser = new User(newUserData);
    await newUser.save();

    const { firstName, lastName, _id } = newUser;
    const newUserResponse: Pick<IUser, 'firstName' | 'lastName'> & {
      _id: string;
    } = {
      _id,
      firstName,
      lastName,
    };

    return res.status(200).json({
      success: true,
      user: newUserResponse,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
