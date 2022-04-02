import { useMutation } from 'react-query';
import { Api } from '@services/index';
import { ISuccessResponse, IApiError } from '@interfaces/index';
import { Signup } from '@/components/modal/signup/signup-form/signupValidationSchema';

const baseUrl = '/users';

export interface IUserCreateResponse extends ISuccessResponse {
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

const usersMethod = {
  create: async (payload: Signup): Promise<IUserCreateResponse> => {
    const { data } = await Api.mutate<Signup, IUserCreateResponse>(baseUrl, 'post', payload);
    console.log(data);
    return data;
  },
};

// eslint-disable-next-line prettier/prettier
export const useUserCreate = () =>
  useMutation<IUserCreateResponse, IApiError, Signup>((data) => usersMethod.create(data));
