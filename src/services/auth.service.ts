import Http from '@/helpers/http';
import { IAccount, IProfileUpdate } from '@/types/auth.type';

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

export const getProfile = async () => {
  try {
    const response = await http.get('/auth/profile');
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateProfile = async (id: string, newProfile: IProfileUpdate) => {
  try {
    const response = await http.update(`/auth/profile/${id}`, newProfile);
    return response;
  } catch (error) {
    return error;
  }
};
