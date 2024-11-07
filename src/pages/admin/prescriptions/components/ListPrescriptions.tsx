import { Link } from 'react-router-dom';
import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import { AddIcon, MoreVertIcon } from '@/components/icons';
import { useEffect, useState } from 'react';
import Select from '@/components/select';
import DirectRoute from '@/components/direct';
// import PrescriptionItem from './PrescriptionItem';
import { getPrescription } from '@/services/prescriptions.service';
import { IPrescription } from '@/types/prescription.type';

const SearchOptions = [
  {
    label: 'Theo mã đơn thuốc',
    value: 'Theo mã đơn thuốc',
  },
  {
    label: 'Theo mã người bệnh',
    value: 'Theo mã người bệnh',
  },
];

interface ListPrescriptons {
  navigate: () => void;
}

const ListPrescriptions = ({ navigate }: ListPrescriptons) => {
  const [showDropdown, setShowDropdown] = useState<string | undefined | null>(null);
  const [prescription, setPrescription] = useState<IPrescription[]>([]);
  // const [prescriptionDetails, setPrescriptionDetails] = useState<any[]>([]);
  console.log('🚀 ~ ListPrescriptions ~ prescription:', prescription);
  const handleToggle = (id: string | null | undefined) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  // const handlePrescriptionDetails = (id: string) => {
  //   (async () => {
  //     const data = await getPrescriptionDetails(id);
  //   })();
  // };

  useEffect(() => {
    (async () => {
      const data = await getPrescription();
      setPrescription(data);
    })();
  }, []);

  return (
    <div>
      <DirectRoute nav="Quản lý đơn thuốc" subnav="Đơn thuốc" />
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <div className="mb-6 flex items-center justify-start gap-5">
          <div>
            <h1 className="text-[18px] text-black font-medium">Danh sách đơn thuốc</h1>
          </div>
          <PrescriptionSearch />
          <button
            onClick={navigate}
            className="text-[18px] font-medium gap-3 border-borderColor border p-2 rounded-lg bg-[#f3f4f7]"
          >
            <AddIcon className="text-primaryAdmin" />
          </button>
        </div>
        <table className="min-w-full table-auto border-collapse text-center">
          <thead>
            <tr className="text-center text-gray-700 ">
              {/* <th className="p-4 font-medium">Mã đơn thuốc</th> */}
              <th className="p-4 font-medium">Tên đơn thuốc</th>
              <th className="p-4 font-medium">Lời dặn</th>
              {/* <th className="p-4 font-medium">Số ngày</th> */}
              {/* <th className="p-4 font-medium">Bệnh nhân</th> */}
              {/* <th className="p-4 font-medium">Bác sĩ</th> */}
              <th className="p-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {prescription.map(item => (
              <tr className="odd" key={item.id}>
                {/* <td className="p-4 sorting_1">{item.id}</td> */}
                <td className="p-4 text-gray-800 font-semibold">{item.name}</td>
                <td className="p-4 text-gray-600">{item.description}</td>
                {/* <td className="p-4 text-gray-600">{item.}</td> */}
                {/* <td className="p-4 profile-image">
                  <Link to="profile.html" className="flex items-center mx-auto">
                    <img
                      src={item.patient.img}
                      className="size-[30px] object-cover rounded-full mr-2"
                      alt={item.patient.name}
                    />
                    <span className="text-gray-800 font-semibold">{item.patient.name}</span>
                  </Link>
                </td>
                <td className="p-4 text-gray-800">
                  <Link to="profile.html" className="flex items-center mx-auto">
                    <img
                      src={item.doctor.img}
                      className="size-[30px] object-cover rounded-full mr-2"
                      alt={item.doctor.name}
                    />
                    <span className="text-gray-800 font-semibold">{item.doctor.name}</span>
                  </Link>
                </td> */}
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
                            // handleClickOpen(item);
                          }}
                        >
                          Chi tiết
                        </Link>
                        <Link
                          to={'#'}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleToggle(item.id)}
                        >
                          Sửa
                        </Link>
                        <Link
                          to={'#'}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleToggle(item.id)}
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
      {/* <PrescriptionItem /> */}
    </div>
  );
};

function PrescriptionSearch() {
  const { control } = useForm({
    mode: 'onChange',
  });
  return (
    <form className="relative flex gap-5 items-center">
      <Input
        name="searchadmin"
        className="!text-[unset] border-none !h-10 !font-light"
        isGlass
        colorGlass="text-primaryAdmin"
        placeholder="Tìm kiếm đơn thuốc ..."
        control={control}
      />
      <Select name="searchPrescription" placeholder="Bộ lọc đơn thuốc" options={SearchOptions} control={control} />
    </form>
  );
}

export default ListPrescriptions;
