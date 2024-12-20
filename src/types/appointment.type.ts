import { APPOINTMENT_STATUS } from './../constants/define';
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
import { STATUS, GENDER, APPOINTMENT_STATUS } from '@/constants/define';
export interface IListAppointment {
  id: string;
  appointment_date: string;
  deposit_amount: string | null;
  booking_type: 'online' | 'offline';
  appointment_type: string | null;
  total_amount: string | null;
  status: `${APPOINTMENT_STATUS}`;
  cancellation_reason: string | null;
  package_id: string;
  patient: {
    id: string;
    insurance_number: string;
    status: `${STATUS}`;
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
  user: {
    id: string;
    status: `${APPOINTMENT_STATUS}`;
    role: {
      id: string;
      name: string;
      description: string;
    };
    user_info: {
      id: string;
      full_name: string;
      address: string;
      avatar: string;
      phone_number: string;
      gender: `${GENDER}`;
      user_id: string;
      dob: string;
      identity_card_id: null;
      department_id: string;
      created_at: string;
      updated_at: string;
    };
  };
}
