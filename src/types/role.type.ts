import { ROLE } from '@/constants/define';

interface IAction {
  id: string;
  name: 'CREATE' | 'UPDATE' | 'DELETE' | 'READ';
}

export interface IPermission {
  id: string;
  name: string;
  description: string;
  actions: IAction[];
}

export interface IRole {
  id: string;
  name: `${ROLE}`;
  description: string;
  permissions?: IPermission[];
  created_at?: Date;
  updated_at?: Date;
}
