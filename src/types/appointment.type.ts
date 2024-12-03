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
  patient: {
    id: string;
    insurance_number: string;
    identity_card_id: string;
    status: `${STATUS}`;
  };
  user: {
    id: string;
    status: `${STATUS}`;
    role: {
      id: string;
      name: string;
      description: string;
    };
    user_info: {
      id: string;
      fullname: string;
      address: string;
      avatar: string;
      phone_number: string;
      gender: `${GENDER}`;
      dob: string;
      department_id: string;
    };
  };
  package: {
    id: string;
    name: string;
    description: string;
    content: string;
    image: string;
    slug: string;
  };
  specialty: {
    id: string;
    name: string;
    description: string;
  };
}
