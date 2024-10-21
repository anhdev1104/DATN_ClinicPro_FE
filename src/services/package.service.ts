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
export const createPackage = async (formData: IPackage) => {
  try {
    const response = await http.post('/packages', formData);
    return response;
  } catch (error) {
    return error;
  }
};
