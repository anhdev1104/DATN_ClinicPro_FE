import { IPackage } from '@/types/package.type';
import Http from '@/helpers/http';

const http = new Http();

export const getAllPackages = async (): Promise<IPackage[] | null> => {
  try {
    const response = await http.get('/packages');

    if (!Array.isArray(response)) {
      throw new Error('Dữ liệu trả về không hợp lệ');
    }

    return response as IPackage[];
  } catch (error: any) {
    console.error('Lỗi khi lấy danh sách gói khám:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Đã xảy ra lỗi khi lấy danh sách gói khám');
  }
};

export const createPackage = async (
  newPackage: Omit<IPackage, 'id' | 'slug' | 'created_at'>
): Promise<IPackage | null> => {
  try {
    const response = await http.post('/packages', newPackage);
    return response as IPackage;
  } catch (error: any) {
    console.error('Lỗi khi tạo gói khám:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Đã xảy ra lỗi khi tạo gói khám');
  }
};
