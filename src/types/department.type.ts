export interface Manager {
  id: number;
  address: string;
  fullname: string;
  avatar: string;
  dob: string;
  phone_number: string;
  gender: string;
  email: string;
}

export interface Department {
  id: number;
  name: string;
  description?: string;
  manager_id?: number;
  created_at: Date;
  updated_at?: Date;
  users_count?: number;
  manager: Manager;
}
