import { http } from '@/helpers/http';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';

interface BaseQueryInstance
  extends BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > {}

export const axiosBaseQuery = (): BaseQueryInstance => async props => {
  try {
    const response = await http.api({ ...props });
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      error: {
        status: axiosError.response?.status,
        data: axiosError.response?.data || axiosError.message
      }
    };
  }
};
