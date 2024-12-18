interface IPermissionAction {
  id?: string;
  permission_id: string;
  action_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface IActions {
  id?: string;
  name: string;
  value: string;
  permission_actions: IPermissionAction[];
  created_at?: string;
  updated_at?: string;
}

export interface ICreateAction extends Omit<IActions, 'permission_actions'> {
  permission_actions?: { permission_id?: string }[];
}
