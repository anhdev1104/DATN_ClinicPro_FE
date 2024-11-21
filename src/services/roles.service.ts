import { http } from '@/helpers/http';
import { AxiosError, AxiosRequestConfig } from 'axios';

export const getAllRole = async <T>(config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await http.api.get<T>('/roles', config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};
