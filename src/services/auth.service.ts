import Http from '@/helpers/http';
import { IAccount } from '@/types/auth.type';

const http = new Http();

export const registerService = async (newAccount: IAccount) => {
  try {
    const response = await http.post('/auth/register', newAccount);
    return response;
  } catch (error) {
    return error;
  }
};

export const logoutService = async () => {
  try {
    const response = await http.post('/auth/logout');
    return response;
  } catch (error) {
    return error;
  }
};
