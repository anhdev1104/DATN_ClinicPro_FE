export interface IPermissionAction {
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
  action?: any;
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
  avatar: string;
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
export interface IRolesDetail extends IRoles {
  permissions: [
    {
      id?: string;
      name: string;
      description: string;
      actions: { id: string; name: string }[];
    },
  ];
}
export interface ICreateRoles {
  id?: string;
  name: string;
  description: string;
  permissions: {
    id: string;
    actions: { id: string }[];
  }[];
}
