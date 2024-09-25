import Http from '@/helpers/http';
import { IAccount } from '@/types/auth.type';

const http = new Http();

export const registerService = async (newAccount: IAccount) => {
  try {
    const res = await http.post('/auth/register', newAccount);
    return res;
  } catch (error) {
    return error;
  }
};
