import { http } from '@/helpers/http';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError, HttpStatusCode } from 'axios';
import query from 'query-string';

const convertParams = (params: AxiosRequestConfig['params']) =>
  query.parse(query.stringify(params, { skipEmptyString: true, skipNull: true }));
type BaseQueryInstance = BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
  },
  unknown,
  unknown
>;
export interface AxiosBaseQueryError {
  status?: typeof HttpStatusCode;
  data: ErrorResponse;
}
export const axiosBaseQuery =
  (): BaseQueryInstance =>
  async ({ params, ...props }) => {
    try {
      const response = await http.api({ ...props, params: convertParams(params) });
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };
