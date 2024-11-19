import { STATUS } from '@/constants/define';
import { IRole } from './role.type';
import { IInfo } from './auth.type';

interface IUserProfile extends IInfo {
  department_id?: number | null;
}
export interface IUserInfo {
  id: string;
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
