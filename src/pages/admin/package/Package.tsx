import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '@/components/input';
import { MoreVertIcon } from '@/components/icons';
import useToggle from '@/hooks/useToggle';
import { getAllPackages } from '@/services/package.service';
import { IPackage } from '@/types/package.type';

const PackagePage = () => {
  const [packages, setPackages] = useState<IPackage[]>([]);
  const { show, handleToggle } = useToggle();

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getAllPackages();
        setPackages(response);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <section className="package">
      <div className="text-primaryAdmin flex items-center text-base mb-10">
        <h2>Gói khám</h2>
        <svg
          className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall mx-2 css-18w7uxr-MuiSvgIcon-root"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="ChevronRightIcon"
        >
          <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
        </svg>
        <span className="text-primaryAdmin/60">Danh sách gói khám</span>
      </div>
      <div className="bg-white rounded-2xl">
        <div className="doctor-table-blk mb-2 pt-5 px-4 flex items-center flex-wrap gap-7">
          <h3 className="text-lg font-semibold mb-0">Danh sách gói khám</h3>
          <div className="flex items-center flex-wrap gap-7">
            <div className="top-nav-search table-search-blk">
              <SearchAdmin />
            </div>
            <div className="transition-all w-12 h-12 rounded-[9px] border border-borderColor font-medium bg-[#f3f4f7] outline-none flex items-center justify-center">
              <Link to="/add-package" className="w-full h-full flex items-center justify-center">
                <img
                  src="https://preclinic.dreamstechnologies.com/html/template/assets/img/icons/plus.svg"
                  alt="Add Package"
                  className="text-cyan-300"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="list-package p-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-gray-700">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Gói khám</th>
                <th className="p-4 font-medium">Mô tả</th>
                <th className="p-4 font-medium">Nội dung</th>
                <th className="p-4 font-medium">Hình ảnh</th>
                <th className="p-4 font-medium">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, index) => (
                <tr key={index} className="odd">
                  <td className="p-4">{pkg.id}</td>
                  <td className="p-4 text-gray-800">{pkg.name}</td>
                  <td className="p-4 text-gray-600">{pkg.description}</td>
                  <td className="p-4 text-gray-600 max-h-24 overflow-y-auto whitespace-normal w-1/3">{pkg.content}</td>
                  <td className="p-4 profile-image">
                    {pkg.image && (
                      <img width={28} height={28} src={pkg.image} className="rounded-full mr-2" alt={pkg.name} />
                    )}
                  </td>
                  <td className="p-4 text-end">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="inline-flex justify-center w-1/2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={handleToggle}
                      >
                        <MoreVertIcon />
                      </button>
                      {show && (
                        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white overflow-hidden">
                          <Link
                            to={'#'}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={handleToggle}
                          >
                            <i className="fa-solid fa-pen-to-square mr-2"></i> Sửa
                          </Link>
                          <Link
                            to={'#'}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={handleToggle}
                          >
                            <i className="fa fa-trash-alt mr-2"></i> Xóa bỏ
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

// Component tìm kiếm
function SearchAdmin() {
  const { control } = useForm({
    mode: 'onChange'
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

export default PackagePage;
