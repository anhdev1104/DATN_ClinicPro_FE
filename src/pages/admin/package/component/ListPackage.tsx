import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '@/components/input';
import { MoreVertIcon, AddIcon } from '@/components/icons';
import DirectRoute from '@/components/direct';
import { getPackages, deletePackage } from '@/services/package.service';
import { IPackage } from '@/types/package.type';
import { toast } from 'react-toastify';
interface ListPackageProps {
  navigate: () => void;
}
const ListPackage: React.FC<ListPackageProps> = ({ navigate }) => {
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  const isOpen = (id: string) => selectedId === id;

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getPackages();
        if (response) {
          const data = response.data;
          setPackages(data);
        } else {
          setPackages([]);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError('Không thể tải danh sách gói khám. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (id: string) => {
    await deletePackage(id);
    setPackages(prevPackages => prevPackages.filter(pkg => pkg.id !== id));
    toast.success('Xóa gói khám thành công!');
  };
  if (loading || error) {
    return <div>{loading ? 'Đang tải dữ liệu...' : 'Không thể lấy dữ liệu'}</div>;
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
        <div className="list-package p-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-gray-700">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Gói khám</th>
                <th className="p-4 font-medium">Danh mục</th>
                <th className="p-4 font-medium">Mô tả</th>
                <th className="p-4 font-medium">Hình ảnh</th>
                <th className="p-4 font-medium">Nội dung</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, index) => (
                <tr key={index} className="odd">
                  <td className="p-4 w-1/12">{index + 1}</td>
                  <td className="p-4 text-gray-800 w-2/12">{pkg.name}</td>
                  <td className="p-4 text-gray-600 w-2/12">{pkg.category_id}</td>
                  <td className="p-4 text-gray-600 w-2/12">{pkg.description}</td>
                  <td className="p-4 profile-image w-2/12 h-32">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                  </td>
                  <td className="p-4 text-gray-600 w-[30%]">
                    <textarea name="" id="" cols="25" rows="6" disabled className="w-full">
                      {pkg.content}
                    </textarea>
                  </td>
                  <td className="p-4 w-4/12 flex items-center">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => handleToggle(pkg.id)}
                      >
                        <MoreVertIcon />
                      </button>
                      {isOpen(pkg.id) && (
                        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white overflow-hidden">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
