import { useMutation } from 'react-query';
import { Api } from '@services/index';
import { ISuccessResponse, IApiError } from '@interfaces/index';
import { ISignin } from '@components/modal/signin/signin-form/signinValidationSchema';

const baseUrl = '/auth';

export interface IAuthLoginResponse extends ISuccessResponse {
  accessToken: string;
}

const authMethods = {
  login: async (payload: ISignin): Promise<IAuthLoginResponse> => {
    const { data } = await Api.mutate<ISignin, IAuthLoginResponse>(`${baseUrl}/login`, 'post', payload);
    return data;
  },
};

export const useAuthLogin = () =>
  useMutation<IAuthLoginResponse, IApiError, ISignin>(authMethods.login, {
    onSuccess: (data: IAuthLoginResponse) => {
      console.log(data.accessToken);
    },
  });
