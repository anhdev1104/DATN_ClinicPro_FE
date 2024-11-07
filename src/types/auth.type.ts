export interface IAccount {
  fullname?: string;
  email: string;
  password: string;
  password_confirm?: string;
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
