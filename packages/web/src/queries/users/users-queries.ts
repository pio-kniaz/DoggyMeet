import {IRegisterUser} from '@pages/home/register-form/registerValidationSchema';
import {useMutation} from 'react-query';
import {Api} from '@services/index';
import {ISuccessResponse, IApiError} from '@interfaces/index';

const baseUrl = '/users';

export interface IUserCreateResponse extends ISuccessResponse {
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

const usersMethod = {
  create: async (payload: IRegisterUser): Promise<IUserCreateResponse> => {
    const {data} = await Api.mutate<IRegisterUser, IUserCreateResponse>(
      baseUrl,
      'post',
      payload
    );
    console.log(data);
    return data;
  },
};

// eslint-disable-next-line prettier/prettier
export const useUserCreate = () => useMutation<IUserCreateResponse, IApiError, IRegisterUser>((data) => usersMethod.create(data));
