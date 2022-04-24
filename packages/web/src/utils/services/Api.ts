import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, Method } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { QueryClient } from 'react-query';

import { authMethods } from '@queries/auth/auth-queries'; // eslint-disable-line import/no-cycle
import { authSelector, clearAccessToken, setAccessToken } from '@/redux/auth/auth.slice';
import { store } from '@/redux/store';

export class Api {
  public static instance: AxiosInstance = axios.create({
    baseURL: `${process.env.API_URL}/api`,
    withCredentials: true,
  });

  public static privateInstance: AxiosInstance = axios.create({
    baseURL: `${process.env.API_URL}/api`,
    withCredentials: true,
  });

  static queryClient() {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    });
  }

  public static getInstance() {
    return this.instance;
  }

  public static getPrivateInstance() {
    return this.privateInstance;
  }

  static query<T = never, R = unknown>(
    url: string,
    method: Extract<Method, 'get'>,
    config?: AxiosRequestConfig<T>,
  ): Promise<AxiosResponse<R>> {
    return this.instance[method](url, config);
  }

  static mutate<T = never, R = unknown>(
    url: string,
    method: Extract<Method, 'post' | 'put' | 'patch' | 'delete'>,
    data?: T,
    config?: AxiosRequestConfig<T>,
  ): Promise<AxiosResponse<R>> {
    return this.instance[method](url, data, config);
  }

  static privateQuery<T = never, R = unknown>(
    url: string,
    method: Extract<Method, 'get'>,
    config?: AxiosRequestConfig<T>,
  ): Promise<AxiosResponse<R>> {
    return this.privateInstance[method](url, config);
  }

  static privateMutate<T = never, R = unknown>(
    url: string,
    method: Extract<Method, 'post' | 'put' | 'patch' | 'delete'>,
    data?: T,
    config?: AxiosRequestConfig<T>,
  ): Promise<AxiosResponse<R>> {
    return this.privateInstance[method](url, data, config);
  }
}

Api.getPrivateInstance().interceptors.request.use(
  (config: any) => {
    const authState = authSelector(store.getState());
    if (authState?.accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${authState?.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const getRefreshToken = async () => {
  try {
    const { accessToken } = await authMethods.refreshToken();
    store.dispatch(setAccessToken({ accessToken }));
    return Promise.resolve();
  } catch (error) {
    store.dispatch(clearAccessToken());
    return Promise.reject(error);
  }
};

createAuthRefreshInterceptor(Api.getPrivateInstance(), getRefreshToken, {
  pauseInstanceWhileRefreshing: true,
});
