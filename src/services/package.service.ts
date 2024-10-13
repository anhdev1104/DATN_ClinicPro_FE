import axios from 'axios';
import { IPackage } from '@/types/package.type';
const baseURL = import.meta.env.VITE_API_URL;

export const getAllPackages = async (): Promise<IPackage[]> => {
  try {
    const response = await axios.get<IPackage[]>(`${baseURL}/packages`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách gói khám:', error);
    throw error;
  }
};
export const createPackage = async (
  data: Omit<IPackage, 'id' | 'slug' | 'created_at'>,
  image: File,
): Promise<IPackage> => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('content', data.content);
    formData.append('image', image);
    const response = await axios.post<IPackage>(`${baseURL}/packages`, formData);

    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo gói khám:', error);
    throw error;
  }
};
