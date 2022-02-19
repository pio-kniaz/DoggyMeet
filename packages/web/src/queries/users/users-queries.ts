import { useMutation } from 'react-query';
import { Api } from '@services/index';
import { ISuccessResponse, IApiError } from '@interfaces/index';
import { ISignup } from '@/components/modal/signup/signup-form/signupValidationSchema';

const baseUrl = '/users';

export interface IUserCreateResponse extends ISuccessResponse {
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

const usersMethod = {
  create: async (payload: ISignup): Promise<IUserCreateResponse> => {
    const { data } = await Api.mutate<ISignup, IUserCreateResponse>(baseUrl, 'post', payload);
    console.log(data);
    return data;
  },
};

// eslint-disable-next-line prettier/prettier
export const useUserCreate = () =>
  useMutation<IUserCreateResponse, IApiError, ISignup>((data) => usersMethod.create(data));
