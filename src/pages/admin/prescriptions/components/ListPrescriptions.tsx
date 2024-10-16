import { ChevronRightIcon } from '@/components/icons';
import { Link } from 'react-router-dom';
import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import { MoreVertIcon, CloseIcon } from '@/components/icons';
import { useState } from 'react';
import Select from '@/components/select';
import { Dialog } from '@mui/material';

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
    },
    instructions: 'Uống 1 viên mỗi ngày sau bữa ăn sáng với nhiều nước. Không nên uống khi bụng đói.'
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
    },
    instructions:
      'Uống 1 viên mỗi 6 giờ nếu cần. Không vượt quá 4 viên trong 24 giờ. Có thể uống trước hoặc sau khi ăn.'
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
    },
    instructions:
      'Uống 1-2 viên mỗi 4-6 giờ khi cần. Uống thuốc cùng thức ăn hoặc sữa để giảm kích ứng dạ dày. Không vượt quá 6 viên trong 24 giờ.'
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
    },
    instructions:
      'Uống 1 viên mỗi 8 giờ (3 lần mỗi ngày) với hoặc không với thức ăn. Hoàn thành toàn bộ liệu trình điều trị, ngay cả khi các triệu chứng đã biến mất sau vài ngày.'
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

interface DetailPrescriptionsProps {
  close: () => void;
  statusLog: boolean;
  selectedItem: (typeof DataPackage)[0] | null;
}

interface ListPrescriptons {
  navigate: () => void;
}

const ListPrescriptions = ({ navigate }: ListPrescriptons) => {
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const handleClose = () => {
    setOpen({ status: false, selectedItem: null });
  };

  const [open, setOpen] = useState<{ status: boolean; selectedItem: (typeof DataPackage)[0] | null }>({
    status: false,
    selectedItem: null
  });

  const handleClickOpen = (item: (typeof DataPackage)[0]) => {
    setOpen({ status: true, selectedItem: item });
  };
  return (
    <div>
      <div className="text-primaryAdmin flex items-center text-base mb-10">
        <h2>Quản lý đơn thuốc</h2>
        <ChevronRightIcon fontSize="small" className="mx-2" />
        <span className="text-primaryAdmin/60">Đơn thuốc</span>
      </div>
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <div className="mb-6 flex items-center justify-start gap-5">
          <div>
            <h1 className="text-[18px] text-black font-medium">Danh sách đơn thuốc</h1>
          </div>
          <SearchAdmin />
          <Select placeholder="Lựa chọn tìm kiếm" data={SearchOptions} />
          <button
            onClick={navigate}
            className="text-[18px] text-black font-medium flex items-center gap-3 border-borderColor border p-3 rounded-lg bg-[#f3f4f7]"
          >
            <img
              src="https://preclinic.dreamstechnologies.com/html/template/assets/img/icons/plus.svg"
              alt="Add Department"
              className="text-cyan-300"
            />
            Thêm Đơn Thuốc
          </button>
        </div>

        <div>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-gray-700">
                <th></th>
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
                <tr className="odd cursor-pointer hover:opacity-100 opacity-90" key={item.id}>
                  <td>
                    <input type="checkbox" className="cursor-pointer" value={item.id} />
                  </td>
                  <td className="p-4 sorting_1">
                    <span className="text-primaryAdmin font-light">#{item.id}</span>
                  </td>
                  <td className="p-4 text-gray-800 font-medium">{item.medicineName}</td>
                  <td className="p-4 text-gray-600 font-light">{item.dosage}</td>
                  <td className="p-4 text-gray-600 font-light">{item.days}</td>
                  <td className="p-4 profile-image">
                    <Link to="profile.html" className="flex items-center">
                      <img
                        src={item.patient.img}
                        className="size-[30px] object-cover rounded-full mr-2"
                        alt={item.patient.name}
                      />
                      <span className="text-gray-800 font-medium">{item.patient.name}</span>
                    </Link>
                  </td>
                  <td className="p-4 text-gray-800">
                    <Link to="profile.html" className="flex items-center">
                      <img
                        src={item.doctor.img}
                        className="size-[30px] object-cover rounded-full mr-2"
                        alt={item.doctor.name}
                      />
                      <span className="text-gray-800 font-medium">{item.doctor.name}</span>
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
                            onClick={() => {
                              handleToggle(item.id);
                              handleClickOpen(item);
                            }}
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
      {open.status && (
        <DetailPrescriptions close={handleClose} statusLog={open.status} selectedItem={open.selectedItem} />
      )}
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
        className="text-primaryAdmin pl-10 border-none "
        isGlass
        colorGlass="text-primaryAdmin"
        placeholder="Tìm kiếm thông tin ..."
        control={control}
      />
    </form>
  );
}

function DetailPrescriptions({ close, statusLog, selectedItem }: DetailPrescriptionsProps) {
  if (!selectedItem) return null;

  return (
    <Dialog
      open={statusLog}
      onClose={close}
      PaperProps={{
        style: {
          backgroundColor: '#f5f5f5',
          padding: '40px',
          width: '600px',
          borderRadius: '8px',
          gap: '20px'
        }
      }}
    >
      <div style={{ padding: '15px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '15px', textTransform: 'uppercase', textAlign: 'center' }}>
          Đơn thuốc: #{selectedItem.id}
        </h1>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h1 style={{ fontWeight: '600', flex: '0 0 50%' }}>Tên thuốc:</h1>
        <p style={{ fontSize: '12px', flex: '0 0 50%' }}>{selectedItem.medicineName}</p>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h1 style={{ fontWeight: '600', flex: '0 0 50%' }}>Liều lượng:</h1>
        <p style={{ fontSize: '12px', flex: '0 0 50%' }}>{selectedItem.dosage}</p>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h1 style={{ fontWeight: '600', flex: '0 0 50%' }}>Số ngày:</h1>
        <p style={{ fontSize: '12px', flex: '0 0 50%' }}>{selectedItem.days}</p>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h1 style={{ fontWeight: '600', flex: '0 0 50%' }}>Bệnh nhân chỉ định:</h1>
        <Link to="profile.html" style={{ display: 'flex', alignItems: 'center', fontSize: '12px', flex: '0 0 50%' }}>
          <img
            src={selectedItem.patient.img}
            style={{
              width: '30px',
              height: '30px',
              objectFit: 'cover',
              borderRadius: '9999px',
              marginRight: '8px'
            }}
            alt={selectedItem.patient.name}
          />
          <span style={{ color: '#2d3748', fontWeight: 'bold' }}>{selectedItem.patient.name}</span>
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h1 style={{ fontWeight: '600', flex: '0 0 50%' }}>Bác sĩ:</h1>
        <p style={{}}>
          <Link to="profile.html" style={{ display: 'flex', alignItems: 'center', fontSize: '12px', flex: '0 0 50%' }}>
            <img
              src={selectedItem.doctor.img}
              style={{
                width: '30px',
                height: '30px',
                objectFit: 'cover',
                borderRadius: '9999px',
                marginRight: '8px'
              }}
              alt={selectedItem.doctor.name}
            />
            <span style={{ color: '#2d3748', fontWeight: 'bold' }}>{selectedItem.doctor.name}</span>
          </Link>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontWeight: '600', marginBottom: '20px' }}>Hướng dẫn sử dụng:</h1>
        <p style={{ fontWeight: '300' }}>{selectedItem.instructions}</p>
      </div>

      <div style={{ position: 'absolute', top: '0', right: '0', padding: '10px', cursor: 'pointer' }} onClick={close}>
        <CloseIcon />
      </div>
    </Dialog>
  );
}

export default ListPrescriptions;
