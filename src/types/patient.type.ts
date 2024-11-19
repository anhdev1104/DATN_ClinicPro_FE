interface IPatientInfo {
  id: string;
  patient_id: string;
  fullname: string;
  email: string;
  phone_number: string;
  address: string;
  dob: string;
  gender: string;
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
}
