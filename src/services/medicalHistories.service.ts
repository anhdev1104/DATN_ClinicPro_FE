import Http from '@/helpers/http';

const http = new Http();

export const getMedicalHistories = async (limit?: number, page?: number) => {
  try {
    const query = limit && page ? `?limit=${limit}&page=${page}` : '';
    const response = await http.get(`/medical-histories${query}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getMedicalHistoriesById = async (id: string) => {
  try {
    const response = await http.get(`/medical-histories/patient/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getDetailMedicalHistorie = async (id: string | undefined) => {
  try {
    const response = await http.get(`/medical-histories/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteDetailMedicalHistorie = async (id: string) => {
  try {
    const response = await http.delete(`/medical-histories`, id);
    return response;
  } catch (error) {
    return error;
  }
};
