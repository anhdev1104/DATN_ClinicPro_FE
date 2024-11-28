import Http from '@/helpers/http';
import { INewPatient } from '@/types/patient.type';
const http = new Http();

export const getPatient = async (key = '') => {
  try {
    const query = key ? `?q=${key}` : '';
    const response = await http.get(`/patients${query}`);
    return response.data;
  } catch (error) {
    return error;
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

export const updatePatient = async (id: string | undefined, INewPatient: INewPatient) => {
  try {
    const response = await http.update(`/patients/${id}`, INewPatient);
    return response;
  } catch (error) {
    return error;
  }
};
