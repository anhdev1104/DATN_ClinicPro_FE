export interface IPackage {
  id: string;
  name: string;
  description: string;
  content: string;
  image?: string; // Có thể hình ảnh không bắt buộc
  slug: string;
  created_at: string;
}
