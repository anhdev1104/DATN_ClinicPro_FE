interface MedicalFile {
  id: string;
  file: string;
  description: string;
  medical_history_id: string;
}

interface Doctor {
  id: string;
  specialty: string;
  email: string;
  fullname: string;
  phone_number: string;
  gender: string;
  avatar: string;
}

interface Patient {
  id: string;
  fullname: string;
  email: string;
  phone_number: string;
  gender: string;
  avatar: string;
}

export interface FileMidecal {
  file: string;
  description: string;
}

export interface NewMedical {
  diagnosis: string;
  description: string;
  patient_id: string;
  treatment: string;
  user_id: string;
  files: FileMidecal[];
}

export interface MedicalRecord {
  id: string;
  description: string;
  diagnosis: string;
  treatment: string;
  created_at: string;
  updated_at: string;
  files: MedicalFile[];
  doctor: Doctor;
  patient: Patient;
}
