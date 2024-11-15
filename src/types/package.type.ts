export interface IPackage {
  id: string;
  name: string;
  description: string;
  content: string;
  image: string;
  slug?: string;
  created_at?: Date;
  category_id: string;
}
export interface Category {
  id: string;
  name: string;
  description: string;
  slug?: string;
}
