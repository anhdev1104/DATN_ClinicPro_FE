import Http from '@/helpers/http';
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
