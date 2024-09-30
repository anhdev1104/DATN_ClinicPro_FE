import { IAccount } from '@/types/auth.type';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

export const loginService = async (account: IAccount) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, account);
    return response.data;
  } catch (error) {
    return error;
  }
};
