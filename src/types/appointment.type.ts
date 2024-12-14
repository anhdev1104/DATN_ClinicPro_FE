export interface IAppointment {
  fullname: string;
  email: string;
  phone_number: string;
  address: string;
  gender?: string;
  description?: string;
  dob: string;
  appointment_date: string | null;
  specialty_id?: string;
}
import { STATUS, GENDER } from '@/constants/define';
export interface IListAppointment {
  id: string;
  appointment_date: string;
  deposit_amount: string | null;
  booking_type: 'online' | 'offline';
  appointment_type: string | null;
  total_amount: string | null;
  status: 'pending' | 'confirmed' | 'canceled';
  cancellation_reason: string | null;
  package_id: string;
  patient: {
    id: string;
    insurance_number: string;
    status: `${STATUS}`;
    user_id: string;
    identity_card_id: string;
    created_at: string;
    updated_at: string;
    patient_info: {
      id: string;
      patient_id: string;
      fullname: string;
      avatar: string;
      email: string;
      phone_number: string;
      address: string;
      dob: string;
      gender: `${GENDER}`;
      created_at: string;
      updated_at: string;
    };
  };
}
