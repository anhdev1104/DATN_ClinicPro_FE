export interface IPackage {
  id: number;
  name: string;
  description: string;
  content: string;
  image: string;
  slug?: string;
  created_at?: Date;
}
