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
