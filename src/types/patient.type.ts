import { MedicalRecord } from './medicalHistories.type';

export interface IPatientInfo {
  id: string;
  patient_id: string;
  fullname: string;
  email: string;
  phone_number: string;
  address: string;
  dob: string;
  gender: string;
  avatar: string;
}

export interface IPatient {
  id: string;
  insurance_number: string;
  status: string;
  user_id: string;
  identity_card_id: string;
  created_at: string;
  updated_at: string;
  patient_info: IPatientInfo;
  medical_histories?: MedicalRecord[];
}

export interface INewPatient {
  insurance_number: string;
  status: 'active' | 'inactive' | 'disabled';
  user_info: {
    fullname: string;
    email: string;
    phone_number: string;
    address: string;
    gender: 'male' | 'female' | 'other';
    dob: string;
  };
  identity_card: {
    type_name: string;
    identity_card_number: string;
  };
}
