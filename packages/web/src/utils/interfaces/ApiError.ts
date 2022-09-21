import type { AxiosError } from 'axios';

type ExtendedError = {
  metaData?: any;
  name: string;
  status: number;
};
export type IApiError = AxiosError<ExtendedError>;
