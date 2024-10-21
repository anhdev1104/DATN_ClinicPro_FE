import Http from '@/helpers/http';
import { IPrescription } from '@/types/prescription.type';
const http = new Http();

export const createPrescription = async (prescription: IPrescription) => {
  try {
    const newPrescription = {
      ...prescription,
      patient_id: 20,
      user_id: 35
    };

    const response = await http.post('/prescriptions', newPrescription);
    return response;
  } catch (error) {
    return error;
  }
};

export const getPrescription = async () => {
  try {
    const response = await http.get('/prescriptions');
    return response;
  } catch (error) {
    return error;
  }
};

export const updatePrescription = async (id: string, prescription: IPrescription) => {
  try {
    const response = await http.update(`/prescriptions/${id}`, prescription);
    return response;
  } catch (error) {
    return error;
  }
};

export const deletePrescription = async (id: string) => {
  try {
    const response = await http.delete('/prescriptions/', id);

    return response;
  } catch (error) {
    return error;
  }
};

export const getPrescriptionsById = async (id: string) => {
  try {
    const response = await http.get(`/prescriptions/patient/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getPrescriptionById = async (id: string) => {
  try {
    const response = await http.get(`/prescriptions/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
