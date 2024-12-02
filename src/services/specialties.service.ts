import Http from '@/helpers/http';
import { ISpecialNew, ISpecialties } from '@/types/specialties.type';

const http = new Http();

export const getSpecialties = async () => {
  try {
    const response = await http.get('/specialties');
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getSpecialtyById = async (id: string | undefined) => {
  try {
    const response = await http.get(`/specialties/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const createSpecialties = async (data: ISpecialties) => {
  try {
    const response = await http.post('/specialties', data);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteSpecialties = async (id: string) => {
  try {
    const response = await http.delete('/specialties', id);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateSpecialties = async (id: any, newData: ISpecialNew) => {
  try {
    const response = await http.update(`/specialties/${id}`, newData);
    return response;
  } catch (error) {
    return error;
  }
};
