import { http } from '@/helpers/http';
import { AxiosError } from 'axios';

export const chatAi = async <T>(data: any): Promise<T> => {
  try {
    const response = await http.api.post<T>('/al/chat', data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};
