import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import { AddIcon, MoreHorizIcon } from '@/components/icons';
import { useState } from 'react';
import Select from '@/components/select';
import DirectRoute from '@/components/direct';
// import PrescriptionItem from './PrescriptionItem';
import { getPrescription } from '@/services/prescriptions.service';
import { IPrescription } from '@/types/prescription.type';
import useFetchingData from '@/hooks/useFetchingData';
import LoadingSpin from '@/components/loading';
import convertTime from '@/helpers/convertTime';

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
  const { isLoading, data: prescription } = useFetchingData<IPrescription[]>({
    serviceFetching: getPrescription,
    initialData: [],
  });

  // const [prescriptionDetails, setPrescriptionDetails] = useState<any[]>([]);

  const handleToggle = (id: string | null | undefined) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  // const handlePrescriptionDetails = (id: string) => {
  //   (async () => {
  //     const data = await getPrescriptionDetails(id);
  //   })();
  // };

  return (
    <div>
      <DirectRoute nav="Quản lý đơn thuốc" subnav="Đơn thuốc" />
      <div className="bg-white size-full p-[20px] rounded-[26px] min-h-[500px]">
        <div className={`mb-6 flex items-center justify-between gap-5 w-[${window.screen.width}px]`}>
          <h1 className="text-[18px] text-black font-medium">Danh sách đơn thuốc</h1>
          <div className="flex gap-5">
            <button
              onClick={navigate}
              className="text-[18px] font-medium gap-3 border-borderColor border py-2 px-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-transparent hover:border-primaryAdmin"
            >
              <AddIcon className="text-primaryAdmin" />
            </button>
            <PrescriptionSearch />
          </div>
        </div>
        {isLoading && (
          <div className="mx-auto text-center pt-10">
            <LoadingSpin className="!w-10 !h-10" color="border-primaryAdmin" />
          </div>
        )}
        {!isLoading && (
          <table className="min-w-full table-auto border-collapse">
            <thead className="border-b-2 border-primaryAdmin/20 bg-primaryAdmin/5">
              <tr className=" text-gray-700">
                <th className="p-4 font-medium">Mã đơn thuốc</th>
                <th className="p-4 font-medium">Tên đơn thuốc</th>
                <th className="p-4 font-medium">Bệnh nhân</th>
                <th className="p-4 font-medium">Lời dặn</th>
                <th className="p-4 font-medium">Người kê đơn</th>
                <th className="p-4 font-medium">Ngày tạo</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {prescription &&
                prescription?.map(item => (
                  <tr className="even:bg-[#f5f5f5]" key={item.id}>
                    <td className="py-2 px-5">{item.id}</td>
                    <td className="py-2 px-5 text-gray-800 font-semibold max-w-[250px]">{item.name}</td>
                    <td className="py-2 px-5 text-gray-600">{item.patient_id}</td>
                    <td className="py-2 px-5 text-gray-600 max-w-[300px]">{item.description}</td>
                    <td className="py-2 px-5 text-gray-800">{item.user_id}</td>
                    <td className="py-2 px-5 text-gray-800">{item.created_at && convertTime(item.created_at)}</td>
                    <td className="py-2 px-5 text-end">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          className="flex justify-center w-1/2 rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-indigo-500"
                          onClick={() => handleToggle(item.id)}
                        >
                          <MoreHorizIcon />
                        </button>
                        {showDropdown === item.id && (
                          <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white">
                            <div
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleToggle(item.id);
                                // handleClickOpen(item);
                              }}
                            >
                              Chi tiết
                            </div>
                            <div
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleToggle(item.id)}
                            >
                              Sửa
                            </div>
                            <div
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleToggle(item.id)}
                            >
                              Xóa bỏ
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
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
        className="border-none !h-10 !font-light text-primaryAdmin"
        isGlass
        colorGlass="text-primaryAdmin top-[9px]"
        placeholder="Tìm kiếm đơn thuốc ..."
        control={control}
      />
      <Select
        name="searchPrescription"
        placeholder="Bộ lọc đơn thuốc"
        options={SearchOptions}
        className="!min-w-[200px]"
        control={control}
      />
    </form>
  );
}

export default ListPrescriptions;
