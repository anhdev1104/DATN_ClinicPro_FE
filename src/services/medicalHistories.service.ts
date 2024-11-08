import Http from '@/helpers/http';

const http = new Http();

export const getMedicalHistoriesById = async (id: string) => {
  try {
    const response = await http.get(`/medical-histories/patient/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
