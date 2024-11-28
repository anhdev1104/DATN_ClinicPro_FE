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
export interface IListAppointment {
  id: string;
  patient_id: string;
  user_id: string;
  package_id: string;
  appointment_date: string;
  deposit_amount: string | null;
  booking_type: 'online' | 'offline';
  appointment_type: string | null;
  total_amount: string | null;
  status: 'pending' | 'confirmed' | 'canceled';
  cancellation_reason: string | null;
  specialty_id: string;
}
