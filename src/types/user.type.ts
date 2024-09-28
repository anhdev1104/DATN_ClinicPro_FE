import { STATUS } from '@/constants/define';
import { IRole } from './role.type';

interface IUserProfile {
  id: number;
  fullname: string;
  address?: string | null;
  avatar?: string;
  phone_number?: string | null;
  gender?: string;
  dob?: string | null;
  identity_card_id?: number | null;
  department_id?: number | null;
  created_at?: string;
  updated_at?: string;
}

interface IUserInfo {
  id: number;
  email: string;
  status: keyof typeof STATUS;
  role: IRole;
  user_info: IUserProfile;
}

export interface IUser {
  access_token: string;
  token_type: string;
  expires_in: number;
  data: IUserInfo;
}
