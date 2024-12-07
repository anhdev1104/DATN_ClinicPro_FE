import React, { useEffect, useState } from 'react';
import { getPackageByCategory, getCategorybyId } from '@/services/package.service';
import { IPackage, Category } from '@/types/package.type';
import { Button } from '@/components/button';
import LoadingPackage from '@/components/loading/LoadingPackage';
interface AdvisePackageProps {
  categoryId: string;
}
export const Package = ({ categoryId }: AdvisePackageProps) => {
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [categoryName, setCategoryName] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        const packageResponse = await getPackageByCategory(categoryId);
        const categoryResponse = await getCategorybyId(categoryId);
        setPackages(packageResponse || []);
        setCategoryName(categoryResponse?.data?.name);
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || 'Có lỗi xảy ra khi lấy dữ liệu.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchPackages();
    }
  }, [categoryId]);

  if (loading) {
    return <LoadingPackage />;
  }
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="sm:pb-10 my-10 sm:border-b-2 sm:border-b-[#abdfe1] sm:border-solid text-third text-2xl md:text-3xl font-semibold">
        {categoryName || 'Đang tải danh mục...'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-11">
        {packages.length > 0 &&
          packages.map(pkg => (
            <div
              className="rounded-md group shadow-lg overflow-hidden border-2 border-white border-solid bg-[rgb(245,_247,_247)]"
              key={pkg.id}
            >
              <div className="h-52 w-full overflow-hidden">
                <img
                  className="h-full object-cover w-full cursor-pointer group-hover:scale-110 duration-1000 transition-all"
                  src={pkg.image || '/path/to/default-image.jpg'}
                  alt={pkg.name}
                />
              </div>
              <div className="py-7 px-5 flex flex-col justify-between">
                <div className="flex justify-between">
                  <h2 className="text-third text-lg font-semibold mb-2">{pkg.name}</h2>
                </div>
                <p className="md:line-clamp-5 text-sm mb-4">{pkg.content}</p>
                <div>
                  <Button type="button" className="py-1 text-sm !normal-case">
                    Tìm hiểu thêm
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
