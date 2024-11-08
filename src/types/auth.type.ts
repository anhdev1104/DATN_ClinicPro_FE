import { STATUS } from '@/constants/define';

export interface IAccount {
  fullname?: string;
  email: string;
  password: string;
  password_confirm?: string;
}

interface IIndentityCard {
  id: string;
  type_name: string;
  identity_card_number: string;
}
export interface IInfo {
  id: string;
  fullname: string;
  address?: string | null;
  avatar?: string;
  phone_number?: string | null;
  gender?: string;
  dob?: string | null;
  identity_card?: IIndentityCard | null;
  created_at?: string;
  updated_at?: string;
}

export interface IUserInfo extends IInfo {
  insurance_number: string | null;
  patient_id: string;
  email: string;
}

export interface IProfile {
  id: string;
  email: string;
  status: keyof typeof STATUS;
  user_info: IUserInfo;
}

export interface IUpdate {
  fullname: string;
  phone_number: string;
  address: string;
  dob: string;
  gender: string;
  insurance_number?: string;
  identity_card?: IIndentityCard;
}

export interface IProfileUpdate {
  email?: string;
  user_info: IUpdate;
  avatar: string | undefined;
}
export interface IForgotPassWord {
  message: string;
}
export interface IForgotPassWordError {
  error: string;
}

export type IResetPassword = IForgotPassWord;
export type IResetPasswordError = IForgotPassWordError;

export interface ChangePasswordErrorResponse {
  errors: {
    password: string[];
    new_password: string[];
  };
  message: string;
}
export type ChangePasswordResponse = IForgotPassWord;
