import { MedicalRecord } from './medicalHistories.type';
import { IPatient } from './patient.type';
import { IUserInfo } from './user.type';

export interface IMedications {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface IMedication {
  id?: string;
  prescription_id?: string;
  medication_id: string;
  quantity?: number;
  duration?: number;
  instructions?: string;
}

export interface IPrescription {
  id?: string;
  patient_id: string;
  user_id: string;
  name: string;
  description?: string;
  medications: IMedication[];
  medical_histories_id: string;
  created_at?: string;
}

export type TMedicationsType = IMedication & {
  medication: {
    id: string;
    name: string;
    category_id: string;
  };
};

export interface IPrescriptionUpdate {
  name: string;
  description?: string;
  medications: Omit<IMedication, 'prescription_id'>[];
}

export interface IPrescriptions extends Omit<IPrescription, 'patient_id' | 'user_id' | 'medical_histories_id'> {
  patient: Omit<IPatient, 'user_id' | 'created_at' | 'updated_at'>;
  user: Omit<IUserInfo, 'email'>;
  medical_histories: Omit<MedicalRecord, 'files' | 'doctor' | 'patient' | 'created_at' | 'updated_at'>;
  medications: TMedicationsType[];
  created_at?: string;
  updated_at?: string;
}
