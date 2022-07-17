import type { IAuthor, ICoordinates } from '../index';

export interface IAnnouncement {
  _id: string;
  author: IAuthor;
  coordinates: ICoordinates;
  city: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}