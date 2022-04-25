import { useMutation, useQuery, UseQueryOptions } from 'react-query';

import { ISuccessResponse, IApiError } from '@interfaces/index';
import { Api } from '@/utils/services/api'; // eslint-disable-line import/no-cycle
import { Signup } from '@/components/modal/signup/signup-form/signupValidationSchema';

const baseUrl = '/users';

export interface IUserCreateResponse extends ISuccessResponse {
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface IGetMeResponse extends ISuccessResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

const userKeys = {
  all: [baseUrl] as const,
  me: [`${baseUrl}/me`] as const,
};

export const usersMethod = {
  create: async (payload: Signup): Promise<IUserCreateResponse> => {
    const { data } = await Api.mutate<Signup, IUserCreateResponse>(baseUrl, 'post', payload);
    return data;
  },
  getMe: async (): Promise<IGetMeResponse> => {
    const { data } = await Api.privateQuery<never, IGetMeResponse>(`${baseUrl}/me`, 'get');
    return data;
  },
  // TODO: REMOVE FOR DEV PURPOSE
  getAllUsers: async (): Promise<any> => {
    const { data } = await Api.privateQuery<never, IGetMeResponse>(baseUrl, 'get');
    return data;
  },
};

// eslint-disable-next-line prettier/prettier
export const useUserCreate = () =>
  useMutation<IUserCreateResponse, IApiError, Signup>((data) => usersMethod.create(data));

// TODO: REMOVE FOR DEV PURPOSE
export const useGetUsers = () => {
  return useQuery<unknown, IApiError>(userKeys.all, usersMethod.getAllUsers);
};
export const useGetMe = (options?: UseQueryOptions<IGetMeResponse, IApiError>) => {
  return useQuery<IGetMeResponse, IApiError>(userKeys.me, usersMethod.getMe, {
    ...options,
  });
};
