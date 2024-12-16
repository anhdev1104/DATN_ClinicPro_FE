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

export const getConversation = async <T>(id: string): Promise<T> => {
  try {
    const response = await http.api.get<T>(`${id}/conversations`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};
