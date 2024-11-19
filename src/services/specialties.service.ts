import Http from '@/helpers/http';

const http = new Http();

export const getSpecialties = async () => {
  try {
    const response = await http.get('/specialties');
    return response.data;
  } catch (error) {
    return error;
  }
};
