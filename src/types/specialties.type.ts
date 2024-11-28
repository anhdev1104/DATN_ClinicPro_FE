export interface ISpecialNew {
  id?: string;
  name: string;
}

export interface ISpecialties extends ISpecialNew {
  description: string;
  created_at?: string;
  updated_at?: string;
  doctors_count?: string;
}
