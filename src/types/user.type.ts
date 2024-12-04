import { GENDER, STATUS } from '@/constants/define';
import { IRole } from './role.type';

export interface IUserProfile {
  id: string;
  department_id?: string;
  fullname: string;
  address: string | null;
  avatar?: string;
  phone_number?: string | null;
  gender: `${GENDER}`;
  dob: string | null;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  identity_card?: string | null;
  identity_card_id?: string | null;
  patient_id?: string;
}

export interface IUserInfo {
  id: string;
  email: string;
  status: `${STATUS}`;
  role: IRole;
  user_info: IUserProfile;
}

export interface IUser {
  access_token: string;
  token_type: string;
  expires_in: number;
  data: IUserInfo;
}
