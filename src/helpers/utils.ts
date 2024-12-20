import { ROLE } from '@/constants/define';
import { DepartmentProps } from '@/types/department.type';
import { IRole } from '@/types/role.type';
import { IUserInfo } from '@/types/user.type';
import { clsx, type ClassValue } from 'clsx';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input));
};

export const filterOutManagers = <T extends any[]>(data: T) => {
  return data.filter(fil => fil?.role?.name === ROLE.MANAGE);
};

export const resolveErrorResponse = <T extends FieldValues = FieldValues>(
  errorResolve: ErrorResponse,
  setError?: UseFormSetError<T>,
) => {
  if (!errorResolve) {
    toast.error('Lỗi hệ thống vui lòng tải lại trang');
    return;
  }
  const { errors, message } = errorResolve;
  if (!errors && !message) {
    toast.error('Có lỗi xảy ra vui lòng đợi trong giây lát.');
    return;
  }
  if (message) toast.error(message);
  if (errors && setError) {
    const [key] = Object.keys(errors) as (keyof T)[];
    key && setError(key as Path<T>, { message: errors[key][0] });
  }
};

export const formatUserSelect = (users: IUserInfo[]) => {
  return users.map(user => ({
    label: user?.user_info?.fullname ?? '',
    value: user?.id,
    avatar: user?.user_info?.avatar,
    email: user?.email,
  }));
};
export const formatDepartmentSelect = (department: DepartmentProps[]) => {
  return department.map(department => ({
    label: department?.name ?? '',
    value: department?.id,
  }));
};
export const formatRoleSelect = (roles: IRole[]) => {
  return roles.map(role => ({
    label: role?.name ?? '',
    value: role?.id,
  }));
};
