import { GENDER, STATUS } from '@/constants/define';
export interface UserProps {
  id: string;
  email: string;
  status: `${STATUS}`;
  fullname: string;
  avatar: string;
  address: string;
  gender: `${GENDER}`;
  dob?: Date;
  phone_number?: string;
}
export type ManagerProps = UserProps;
export interface DepartmentProps {
  id: string;
  description?: string | null;
  manager_id?: string;
  manager?: ManagerProps;
  name: string;
  users_count: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface DepartmentDetailProps extends Omit<DepartmentProps, 'manager_id'> {
  users: UserProps[];
}
