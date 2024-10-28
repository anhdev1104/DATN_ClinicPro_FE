export interface IPackage {
  id: string;
  name: string;
  description: string;
  content: string;
  image: string;
  slug?: string;
  created_at?: Date;
}
