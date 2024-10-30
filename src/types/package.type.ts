export interface IPackage {
  id: string;
  name: string;
  description: string;
  content: string;
  image: string;
  slug?: string;
  created_at?: Date;
}
export interface IUpPackage {
  name: string;
  description: string;
  content: string;
  image?: File;
}
