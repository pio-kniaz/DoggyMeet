import axios, {AxiosError} from 'axios';

export const isApiError = (err: unknown): err is AxiosError =>
  axios.isAxiosError(err);
