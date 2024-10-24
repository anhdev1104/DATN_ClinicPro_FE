import { Itablet } from './tablet.type';

export interface IPrescription {
  patient_id: string;
  user_id: string;
  name: string;
  description: string;
  // medications: Array<Itablet>;
}
