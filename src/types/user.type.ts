import { IRole } from './role.type';

interface IUserInfo {
  id?: number;
  patient_id?: number;
  fullname: string;
  avatar: string;
  email: string;
  phone_number?: string;
  address?: string;
  dob?: string;
  gender?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IUser {
  id?: number;
  email: string;
  role: IRole;
  user_info: IUserInfo;
  created_at?: string;
  updated_at?: string;
}
