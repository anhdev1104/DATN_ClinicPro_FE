export interface IPrescription {
  patient_id: number;
  doctor_id: number;
  name: string;
  instructions: string;
  frequency: string;
  dosage: string;
  duration: number;
}
