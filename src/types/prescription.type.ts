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
