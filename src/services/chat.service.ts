import { http } from '@/helpers/http';
import { INewMessage } from '@/types/chatAi.type';
import { AxiosError } from 'axios';

export const getListConversation = async (userId: string) => {
  try {
    const response = await http.get(`/users/${userId}/conversations`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

export const deleteConversation = async (conversationId: string) => {
  try {
    const response = await http.delete(`/conversations`, conversationId);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

export const getDetailConversation = async (conversationId: string, userId: string | null) => {
  try {
    const response = await http.get(`/conversations/${conversationId}/${userId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

export const sendMessageConversation = async (formData: INewMessage) => {
  try {
    const response = await http.post('/al/chat', formData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};
