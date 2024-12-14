import { http } from '@/helpers/http';
import { AxiosError, AxiosRequestConfig } from 'axios';
export const getUsersByRole = async <T>(roleId: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await http.api.get<T>(`/users/role/${roleId}`, config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data || error.message;
  }
};

export const getDoctors = async () => {
  const doctorRoleId = '4eec92f6-8480-41d8-9da5-140445194735';
  try {
    const doctors = await getUsersByRole(doctorRoleId);
    return doctors.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching doctors:', error);
  }
};
