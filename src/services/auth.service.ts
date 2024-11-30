import Http from '@/helpers/http';
import { IAccount, IProfileUpdate } from '@/types/auth.type';
import { PasswordProps } from '@/pages/client/auth/ChangePassword';
import { ForgotPassword } from '@/pages/client/auth/ForgotPassword';
import { ResetPassword } from '@/pages/client/auth/ResetPassword';
import { AxiosError } from 'axios';

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
    return response.data;
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

export const changePassword = async <T>(data: Partial<Omit<PasswordProps, 'confirmPassword'>>): Promise<T> => {
  try {
    const response = await http.api.put<T>('/auth/change-password', data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

export const forgotPassword = async <T>(data: ForgotPassword): Promise<T> => {
  try {
    const response = await http.api.post<T>('/auth/forgot-password', data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

export const resetPassword = async <T>(data: ResetPassword): Promise<T> => {
  try {
    const response = await http.api.post<T>('/auth/reset-password', data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};
