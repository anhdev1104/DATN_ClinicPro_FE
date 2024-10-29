export interface IMedications {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface IMedication {
  medication_id: number;
  instructions: string;
  quantity: number;
  duration: number;
}

export interface IPrescription {
  id?: string;
  patient_id: string;
  user_id: string;
  name: string;
  description?: string;
  medications: IMedication[];
}
