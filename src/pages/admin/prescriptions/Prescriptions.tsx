import { ChevronRightIcon } from '@/components/icons';
import { Link } from 'react-router-dom';
import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import { MoreVertIcon } from '@/components/icons';
import { useState } from 'react';
import Select from '@/components/select';

const DataPackage = [
  {
    id: 1,
    medicineName: 'Aspirin',
    dosage: '100mg',
    days: '7',
    patient: {
      name: 'Trần Minh Khôi',
      img: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    doctor: {
      name: 'Dr. Nguyễn Thị Hoa',
      img: 'https://randomuser.me/api/portraits/women/1.jpg'
    }
  },
  {
    id: 2,
    medicineName: 'Paracetamol',
    dosage: '500mg',
    days: '5',
    patient: {
      name: 'Lê Thị Bích',
      img: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    doctor: {
      name: 'Dr. Phạm Văn Thành',
      img: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
  },
  {
    id: 3,
    medicineName: 'Ibuprofen',
    dosage: '200mg',
    days: '10',
    patient: {
      name: 'Nguyễn Hữu Tài',
      img: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    doctor: {
      name: 'Dr. Lê Thị Thu Hằng',
      img: 'https://randomuser.me/api/portraits/women/3.jpg'
    }
  },
  {
    id: 4,
    medicineName: 'Amoxicillin',
    dosage: '250mg',
    days: '7',
    patient: {
      name: 'Phạm Hoàng Anh',
      img: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    doctor: {
      name: 'Dr. Trần Văn Dũng',
      img: 'https://randomuser.me/api/portraits/men/4.jpg'
    }
  }
];

const SearchOptions = [
  {
    name: 'Theo mã đơn thuốc'
  },
  {
    name: 'Theo mã người bệnh'
  }
];

const Prescriptions = () => {
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  return (
    <div>
      <div className="text-primaryAdmin flex items-center text-base mb-10">
        <h2>Quản lý đơn thuốc</h2>
        <ChevronRightIcon fontSize="small" className="mx-2" />
        <span className="text-primaryAdmin">Đơn thuốc</span>
      </div>
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <div className="mb-6 flex items-center justify-start gap-5">
          <div>
            <h1 className="text-[18px] text-black font-medium">Danh sách đơn thuốc</h1>
          </div>
          <SearchAdmin />
          <Select placeholder="Lựa chọn tìm kiếm" data={SearchOptions} />
          <Link
            to={'/add-prescriptions'}
            className="text-[18px] text-black font-medium gap-3 border-borderColor border p-3 rounded-lg bg-[#f3f4f7]"
          >
            <img
              src="https://preclinic.dreamstechnologies.com/html/template/assets/img/icons/plus.svg"
              alt="Add Department"
              className="text-cyan-300"
            />
          </Link>
        </div>

        <div>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-gray-700">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Tên thuốc</th>
                <th className="p-4 font-medium">Liều lượng</th>
                <th className="p-4 font-medium">Số ngày</th>
                <th className="p-4 font-medium">Bệnh nhân</th>
                <th className="p-4 font-medium">Bác sĩ</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {DataPackage.map(item => (
                <tr className="odd" key={item.id}>
                  <td className="p-4 sorting_1">
                    <span>{item.id}</span>
                  </td>
                  <td className="p-4 text-gray-800">{item.medicineName}</td>
                  <td className="p-4 text-gray-600">{item.dosage}</td>
                  <td className="p-4 text-gray-600">{item.days}</td>
                  <td className="p-4 profile-image">
                    <Link to="profile.html" className="flex items-center">
                      <img
                        src={item.patient.img}
                        className="size-[30px] object-cover rounded-full mr-2"
                        alt={item.patient.name}
                      />
                      <span className="text-gray-800 font-bold">{item.patient.name}</span>
                    </Link>
                  </td>
                  <td className="p-4 text-gray-800">
                    <Link to="profile.html" className="flex items-center">
                      <img
                        src={item.doctor.img}
                        className="size-[30px] object-cover rounded-full mr-2"
                        alt={item.doctor.name}
                      />
                      <span className="text-gray-800 font-bold">{item.doctor.name}</span>
                    </Link>
                  </td>
                  <td className="p-4 text-end">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="inline-flex justify-center w-1/2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-indigo-500"
                        onClick={() => handleToggle(item.id)}
                      >
                        <MoreVertIcon />
                      </button>
                      {showDropdown === item.id && (
                        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white overflow-hidden">
                          <Link
                            to={'#'}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleToggle(item.id)}
                          >
                            <i className="fa-solid fa-pen-to-square mr-2"></i> Chi tiết
                          </Link>
                          <Link
                            to={'#'}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleToggle(item.id)}
                          >
                            <i className="fa-solid fa-pen-to-square mr-2"></i> Sửa
                          </Link>
                          <Link
                            to={'#'}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleToggle(item.id)}
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
    </div>
  );
};

function SearchAdmin() {
  const { control } = useForm({
    mode: 'onChange'
  });
  return (
    <form className="w-[300px] relative">
      <Input
        name="searchadmin"
        className="text-primaryAdmin pl-10 border-none"
        isGlass
        colorGlass="text-primaryAdmin"
        placeholder="Tìm kiếm thông tin ..."
        control={control}
      />
    </form>
  );
}

export default Prescriptions;
