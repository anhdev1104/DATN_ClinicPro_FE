import { ROLE } from '@/constants/define';

interface IAction {
  id: number;
  name: 'CREATE' | 'UPDATE' | 'DELETE' | 'READ';
}

export interface IPermission {
  id: string;
  name: string;
  description: string;
  actions: IAction[];
}

export interface IRole {
  id: number;
  name: keyof typeof ROLE;
  description: string;
  permissions?: IPermission[];
}
