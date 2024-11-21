export interface IPackage {
  id: string;
  name: string;
  description: string;
  content: string;
  image: string;
  slug?: string;
  created_at?: Date;
  specialty_id: string;
  category_id: string;
  specialty_id?: string;
}
export interface Category {
  id: string;
  name: string;
  description: string;
  slug?: string;
}
