import axios from 'axios';
import Cookies from 'js-cookie';
import { enviroments } from './config';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: enviroments.baseUrl.concat('/'),
  headers: {
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  },
});

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

export const axiosBaseQuery = (): BaseQueryInstance => async (props) => {
  try {
    const response = await axiosInstance({ ...props });
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
