import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '@/components/input';
import { MoreVertIcon, AddIcon } from '@/components/icons';
import DirectRoute from '@/components/direct';
import { getPackages, deletePackage, getCategory } from '@/services/package.service';
import { IPackage, Category } from '@/types/package.type';
import { toast } from 'react-toastify';
import LoadingSpin from '@/components/loading';
interface ListPackageProps {
  navigate: () => void;
}

const ListPackage: React.FC<ListPackageProps> = ({ navigate }) => {
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const handleToggle = (id: string) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  const isOpen = (id: string) => selectedId === id;

  useEffect(() => {
    const fetchPackagesAndCategory = async () => {
      try {
        const packageResponse = await getPackages();
        const categoryResponse = await getCategory();
        setPackages(packageResponse.data || []);
        setCategories(categoryResponse || []);
      } catch (error) {
        setError('Không thể tải danh sách gói khám. Vui lòng thử lại sau.');
        return error;
      } finally {
        setLoading(false);
      }
    };

    fetchPackagesAndCategory();
  }, []);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Không có danh mục';
  };

  const handleDelete = async (id: string) => {
    await deletePackage(id);
    setPackages(prevPackages => prevPackages.filter(pkg => pkg.id !== id));
    toast.success('Xóa gói khám thành công!');
  };
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPackages = packages.slice(startIndex, endIndex);
  const totalPages = Math.ceil(packages.length / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  if (error) {
    return <div>{'Không thể lấy dữ liệu'}</div>;
  }

  return (
    <section className="package">
      <DirectRoute nav="Quản lý gói khám" subnav="Danh sách gói khám" />
      <div className="bg-white rounded-2xl">
        <div className="doctor-table-blk mb-2 pt-5 px-4 flex items-center flex-wrap gap-7">
          <h1 className="text-lg font-semibold mb-0">Danh sách gói khám</h1>
          <div className="flex items-center flex-wrap gap-7">
            <div className="top-nav-search table-search-blk">
              <SearchAdmin />
            </div>
            <div className="transition-all w-12 h-12 rounded-[9px] border border-borderColor font-medium bg-[#f3f4f7] outline-none flex items-center justify-center">
              <button onClick={navigate}>
                <AddIcon className="text-primaryAdmin" />
              </button>
            </div>
          </div>
        </div>
        {loading && (
          <div className="mx-auto text-center pt-10">
            <LoadingSpin className="!w-10 !h-10" color="border-primaryAdmin" />
          </div>
        )}
        <div className="grid grid-cols-4 gap-2 py-7 px-5">
          {currentPackages.length > 0 &&
            currentPackages.map((pkg, index) => (
              <div className="max-w-sm mx-auto border rounded-lg shadow-md p-4 bg-white" key={index}>
                <div className="relative">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-52 object-cover rounded-md" />
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tên gói</label>
                    <input
                      type="text"
                      value={pkg.name}
                      className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                    <input
                      type="text"
                      value={getCategoryName(pkg.category_id)}
                      className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nội dung </label>
                    <textarea
                      name="content"
                      id=""
                      cols={25}
                      rows={6}
                      disabled
                      value={pkg.content}
                      className="w-full bg-white scroll-select"
                    />
                  </div>
                  <div className="relative inline-block text-left ml-52">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      onClick={() => handleToggle(pkg.id)}
                    >
                      <MoreVertIcon />
                    </button>
                    {isOpen(pkg.id) && (
                      <div className="absolute right-0 z-10 mt-[-115px] w-56 rounded-md shadow-lg bg-white overflow-hidden">
                        <Link
                          to={`/edit-package/${pkg.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleToggle(pkg.id)}
                        >
                          Sửa
                        </Link>
                        <Link
                          to="#"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleDelete(pkg.id)}
                        >
                          Xóa bỏ
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center items-center gap-4 py-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

function SearchAdmin() {
  const { control } = useForm({
    mode: 'onChange',
  });

  return (
    <form className="w-[300px]">
      <Input
        name="searchadmin"
        className="text-current pl-10 border-none"
        isGlass
        colorGlass="text-primaryAdmin"
        placeholder="Tìm kiếm thông tin ..."
        control={control}
      />
    </form>
  );
}

export default ListPackage;
