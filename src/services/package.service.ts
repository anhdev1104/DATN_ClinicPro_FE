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
export const getPackageById = async (id: string) => {
  try {
    const response = await http.get(`/packages/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
export const getCategory = async () => {
  try {
    const response = await http.get('/package-categories');
    return response;
  } catch (error) {
    return error;
  }
};
export const getCategorybyId = async (id: string) => {
  try {
    const response = await http.get(`/package-categories/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
export const createPackage = async (formData: FormData) => {
  try {
    const response = await http.post('/packages', formData);
    return response;
  } catch (error) {
    return error;
  }
};
export const updatePackage = async (id: string, data: FormData) => {
  try {
    const response = await http.update(`/packages/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const DeletePackage = async (id: string) => {
  try {
    const response = await http.delete(`/packages`, id);
    return response;
  } catch (error) {
    return error;
  }
};
