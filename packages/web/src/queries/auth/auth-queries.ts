import { useMutation, UseMutationOptions } from 'react-query';
import { Api } from '@services/index';
import { ISuccessResponse, IApiError } from '@interfaces/index';
import { Signin } from '@components/modal/signin/signin-form/signinValidationSchema';

const baseUrl = '/auth';

export interface IAuthLoginResponse extends ISuccessResponse {
  accessToken: string;
}

export const authMethods = {
  login: async (payload: Signin): Promise<IAuthLoginResponse> => {
    const { data } = await Api.mutate<Signin, IAuthLoginResponse>(`${baseUrl}/login`, 'post', payload);
    return data;
  },
  refreshToken: async (): Promise<IAuthLoginResponse> => {
    const { data } = await Api.mutate<undefined, IAuthLoginResponse>(`${baseUrl}/refresh-token`, 'post');
    return data;
  },
};

export const useAuthLogin = () => useMutation<IAuthLoginResponse, IApiError, Signin>(authMethods.login);
export const useRefreshToken = (options?: Omit<UseMutationOptions<IAuthLoginResponse, IApiError>, 'mutationFn'>) =>
  useMutation<IAuthLoginResponse, IApiError>(authMethods.refreshToken, options);
