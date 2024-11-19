export interface IAddSpecialties {
  id?: '123e4567-e89b-12d3-a456-426614174000';
  name: 'Cardiology';
  description: 'Chuyên khoa tim mạch';
  created_at?: '2024-09-16T14:34:30.000000Z';
  updated_at?: '2024-09-16T14:34:30.000000Z';
}

export interface ISpecialties {
  data: IAddSpecialties[];
  prev_page_url: string;
  next_page_url: string;
  total: number;
}
