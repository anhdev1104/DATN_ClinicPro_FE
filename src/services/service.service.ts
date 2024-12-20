import Http from '@/helpers/http';
import { AxiosError } from 'axios';

const http = new Http();

export const getService = async () => {
  try {
    const response = await http.get('services');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};
