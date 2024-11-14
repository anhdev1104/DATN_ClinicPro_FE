import Http from '@/helpers/http';
const http = new Http();

export const uploadFile = async (formData: FormData) => {
  try {
    const res = await http.post('/upload/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
