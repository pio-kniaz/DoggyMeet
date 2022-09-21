import { useMutation, useQuery, UseQueryOptions } from 'react-query';
import { ISuccessResponse, IApiError, IQueries, IPaginable } from '@interfaces/index';
import { IAnnouncement } from '@doggy-meet/shared';
import { queryBuilder } from '@helpers/index';

import { Api } from '@/utils/services/Api'; // eslint-disable-line import/no-cycle

const baseUrl = '/announcements';

export interface IGetAllAnnouncements extends ISuccessResponse {
  announcements: IPaginable<IAnnouncement>;
}

interface ICreateAnnouncement {
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
}
interface IUseGetAllAnnouncementPayload {
  queryOptions?: UseQueryOptions<IGetAllAnnouncements, IApiError>;
  query?: IQueries;
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

export const announcementKeys = {
  root: [baseUrl] as const,
  list: (filters: string) => {
    if (!filters) {
      return [...announcementKeys.root] as const;
    }
    return [...announcementKeys.root, filters] as const;
  },
};

export const announcementsMethod = {
  create: async (payload: ICreateAnnouncement) => {
    const { data } = await Api.privateMutate<ICreateAnnouncement, IAnnouncementCreateResponse>(
      baseUrl,
      'post',
      payload,
    );
    return data;
  },
  list: async (queries: string) => {
    const { data } = await Api.privateQuery<never, IGetAllAnnouncements>(`${baseUrl}${queries}`, 'get');
    return data;
  },
};

export const useCreateAnnouncement = () => {
  return useMutation<IAnnouncementCreateResponse, IApiError, ICreateAnnouncement>((data) =>
    announcementsMethod.create(data),
  );
};

export const useGetAllAnnouncement = ({ queryOptions, query = {} }: IUseGetAllAnnouncementPayload) => {
  const queries = queryBuilder(query);
  return useQuery({
    queryKey: announcementKeys.list(queries),
    queryFn: async () => announcementsMethod.list(queries),
    ...queryOptions,
  });
};
