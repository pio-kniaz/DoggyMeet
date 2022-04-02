import { useMutation } from 'react-query';
import { Api } from '@services/index';
import { ISuccessResponse, IApiError } from '@interfaces/index';
import { Signin } from '@components/modal/signin/signin-form/signinValidationSchema';

const baseUrl = '/auth';

export interface IAuthLoginResponse extends ISuccessResponse {
  accessToken: string;
}

const authMethods = {
  login: async (payload: Signin): Promise<IAuthLoginResponse> => {
    const { data } = await Api.mutate<Signin, IAuthLoginResponse>(`${baseUrl}/login`, 'post', payload);
    return data;
  },
};

export const useAuthLogin = () =>
  useMutation<IAuthLoginResponse, IApiError, Signin>(authMethods.login, {
    onSuccess: (data: IAuthLoginResponse) => {
      console.log(data.accessToken);
    },
  });
