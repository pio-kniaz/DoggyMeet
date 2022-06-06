/* eslint-disable security/detect-non-literal-regexp */

import type { IVerifyJWTRequest } from '@interfaces/index';
import type { Response, NextFunction } from 'express';
import { Announcement } from '@models/Announcements';
import { getPagination } from '@helpers/getPagination';

interface IAnnouncementQuery {
  status?: {
    $regex: RegExp;
    $options: string;
  };
  city?: {
    $regex: RegExp;
    $options: string;
  };
  name?: {
    $regex: RegExp;
    $options: string;
  };
  'author.name'?: {
    $regex: RegExp;
    $options: string;
  };
}

export const getAllAnnouncementsController = async (
  req: IVerifyJWTRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 0, size = 0, status, city, name, author } = req.query;
    const { limit, offset } = getPagination(+page, +size);
    const query: IAnnouncementQuery = {};
    if (typeof status === 'string') {
      query.status = { $regex: new RegExp(status), $options: 'i' };
    }
    if (typeof city === 'string') {
      query.city = { $regex: new RegExp(city), $options: 'i' };
    }
    if (typeof name === 'string') {
      query.name = { $regex: new RegExp(name), $options: 'i' };
    }
    if (typeof author === 'string') {
      query['author.name'] = { $regex: new RegExp(author), $options: 'i' };
    }
    const result = await Announcement.paginate(query, {
      offset,
      limit,
      sort: { createdAt: -1 },
    });
    return res.status(200).json({
      success: true,
      announcements: result,
    });
  } catch (error) {
    return next(error);
  }
};
