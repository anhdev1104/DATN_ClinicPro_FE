import Http from '@/helpers/http';
import { INewPatient } from '@/types/patient.type';
const http = new Http();

export const getPatient = async (key = '', page = '', limit = '') => {
  try {
    const queryParams = new URLSearchParams();
    if (key) queryParams.append('q', key);
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);

    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const response = await http.get(`/patients${query}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPatientById = async (id: string | undefined) => {
  try {
    const response = await http.get(`/patients/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createPatient = async (patient: INewPatient) => {
  try {
    const response = await http.post(`/patients`, patient);
    return response;
  } catch (error) {
    return error;
  }
};

export const updatePatient = async (id: string | undefined, INewPatient: INewPatient | any) => {
  try {
    const response = await http.update(`/patients/${id}`, INewPatient);
    return response;
  } catch (error) {
    return error;
  }
};
