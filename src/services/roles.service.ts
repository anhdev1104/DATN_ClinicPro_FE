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
export const getUsersByRole = async <T>(roleId: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await http.api.get<T>(`/users/role/${roleId}`, config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data || error.message;
  }
};
