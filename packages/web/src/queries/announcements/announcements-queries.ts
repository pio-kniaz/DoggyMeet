import { useMutation } from 'react-query';
import { ISuccessResponse, IApiError } from '@interfaces/index';

import { Api } from '@/utils/services/api'; // eslint-disable-line import/no-cycle

const baseUrl = '/announcements';

interface ICreateAnnouncement {
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
}

export interface IAnnouncementCreateResponse extends ISuccessResponse {
  _id: string;
  author: {
    id: string;
    name: string;
  };
  city: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'open' | 'closed';
  updatedAt: string;
  createdAt: string;
}

export const announcementsMethod = {
  create: async (payload: ICreateAnnouncement) => {
    const { data } = await Api.privateMutate<ICreateAnnouncement, IAnnouncementCreateResponse>(
      baseUrl,
      'post',
      payload,
    );
    return data;
  },
};

export const useCreateAnnouncement = () => {
  return useMutation<IAnnouncementCreateResponse, IApiError, ICreateAnnouncement>((data) =>
    announcementsMethod.create(data),
  );
};
