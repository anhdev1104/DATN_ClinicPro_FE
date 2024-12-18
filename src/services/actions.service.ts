import Http from '@/helpers/http';
import { ICreateAction } from '@/types/permissions.type';
import { AxiosError } from 'axios';

const http = new Http();

export const getAllAction = async () => {
  try {
    const response = await http.get('/actions');
    return response.success ? response.data : response;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
};

export const createAction = async (data: ICreateAction) => {
  try {
    const response = await http.post('/actions', data);
    return response;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
};

export const updateAction = async (id: string, data: ICreateAction) => {
  try {
    const response = await http.update(`/actions/${id}`, data);
    return response;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
};

export const removeAction = async (id: string) => {
  try {
    const response = await http.delete('/actions', id);
    return response;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
};

export const getActionDetail = async (id: string) => {
  try {
    const response = await http.get(`/actions/${id}`);
    return response;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
};
