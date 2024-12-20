import { STATUS } from '@/constants/define';

interface IPermissionAction {
  id?: string;
  permission_id: string;
  action_id: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface IActions {
  id?: string;
  name: string;
  value: string;
  permission_actions: IPermissionAction[];
  created_at?: Date;
  updated_at?: Date;
}
export interface ICreateAction extends Omit<IActions, 'permission_actions'> {
  permissions?: { permission_id?: string }[];
}

export interface IPermissions {
  id?: string;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  permission_actions: IPermissionAction[];
}
export interface ICreatePermissions {
  id?: string;
  name: string;
  description: string;
  actions?: {
    action_id?: string;
  }[];
}
export interface UserRole {
  id: string;
  fullname: string;
  status: `${STATUS}`;
  email: string;
  role_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface IRoles {
  id?: string;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  users_count: number;
  users: UserRole[];
}
