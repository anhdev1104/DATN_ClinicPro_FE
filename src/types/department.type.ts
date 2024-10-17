export interface Manager {
  id: number;
  status: string;
  email: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Department {
  id: number;
  name: string;
  description?: string;
  manager_id?: number;
  created_at: Date;
  updated_at?: Date;
  users_count?: number;
  manager: Manager;
}
