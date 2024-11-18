import Http from '@/helpers/http';
import { IAppointment } from '@/types/appointment.type';

const http = new Http();

export const addAppointments = async (data: IAppointment) => {
  try {
    const response = await http.post('/appointments', data);
    return response.data;
  } catch (error) {
    return error;
  }
};
