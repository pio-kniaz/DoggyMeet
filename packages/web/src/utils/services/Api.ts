import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, Method } from 'axios';
import { QueryClient } from 'react-query';

export class Api {
  public static instance: AxiosInstance = axios.create({
    baseURL: `${process.env.API_URL}/api`,
  });

  static queryClient() {
    return new QueryClient();
  }

  public static getInstance() {
    return this.instance;
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
}
