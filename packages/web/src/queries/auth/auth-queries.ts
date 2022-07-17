import { useQuery, useMutation, UseQueryOptions } from 'react-query';
import { ISuccessResponse, IApiError } from '@interfaces/index';
import { Signin } from '@components/modal/signin/signin-form/signinValidationSchema';
import { Api } from '@/utils/services/Api'; // eslint-disable-line import/no-cycle

const baseUrl = '/auth';

export interface IAuthLoginResponse extends ISuccessResponse {
  accessToken: string;
}

const authKeys = {
  all: [baseUrl] as const,
  me: [`${baseUrl}/refresh-token`] as const,
};

export const authMethods = {
  login: async (payload: Signin): Promise<IAuthLoginResponse> => {
    const { data } = await Api.mutate<Signin, IAuthLoginResponse>(`${baseUrl}/login`, 'post', payload);
    return data;
  },
  logout: async (): Promise<ISuccessResponse> => {
    const { data } = await Api.privateMutate<unknown, IAuthLoginResponse>(`${baseUrl}/logout`, 'post');
    return data;
  },
  refreshToken: async (): Promise<IAuthLoginResponse> => {
    const { data } = await Api.query<never, IAuthLoginResponse>(`${baseUrl}/refresh-token`, 'get');
    return data;
  },
};

export const useLogin = () => useMutation<IAuthLoginResponse, IApiError, Signin>(authMethods.login);
export const useRefreshToken = (options?: UseQueryOptions<IAuthLoginResponse, IApiError>) =>
  useQuery<IAuthLoginResponse, IApiError>(authKeys.me, authMethods.refreshToken, { ...options });
export const useLogout = () => useMutation<ISuccessResponse, IApiError>(authMethods.logout);
