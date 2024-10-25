import { IPackage } from '@/types/package.type';
import Http from '@/helpers/http';

const http = new Http();
export const getPackages = async () => {
  try {
    const response = await http.get('/packages');
    return response;
  } catch (error) {
    return error;
  }
};
export const createPackage = async (formData: FormData) => {
  try {
    const response = await http.post('/packages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const updatePackage = async (id: number, data: FormData) => {
  try {
    const response = await http.update(`/packages/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};