import Http from '@/helpers/http';
import { IAppointment } from '@/types/appointment.type';

const http = new Http();
export const getAppointments = async () => {
  try {
    const response = await http.get('/appointments');
    return response;
  } catch (error) {
    return error;
  }
};
export const getAppointmentbyId = async (id: string) => {
  try {
    const response = await http.get(`/appointments/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
export const deleteAppointment = async (id: string) => {
  try {
    const response = await http.delete(`/appointments`, id);
    return response;
  } catch (error) {
    return error;
  }
};
export const addAppointments = async (data: IAppointment) => {
  try {
    const response = await http.post('/appointments', data);
    return response;
  } catch (error) {
    return error;
  }
};
