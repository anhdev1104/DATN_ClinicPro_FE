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

export const uploadImages = async (formData: FormData) => {
  try {
    const res = await http.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const uploadImage = async (formData: FormData) => {
  try {
    const res = await http.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const uploadFiles = async (formData: FormData) => {
  try {
    const res = await http.post('/upload/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
