import DirectRoute from '@/components/direct';
import { AddIcon, VisibilityIcon } from '@/components/icons';
import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Select from '@/components/select';
import { useEffect, useState } from 'react';
import LoadingSpin from '@/components/loading';
import { IPatient } from '@/types/patient.type';
import { getPatient } from '@/services/patient.service';
import Tags from '@/components/tags';
import convertGender from '@/helpers/convertToGender';

const SearchOptions = [
  {
    label: 'Theo mã ',
    value: 'Theo mã ',
  },
  {
    label: 'Theo mã người bệnh',
    value: 'Theo mã người bệnh',
  },
];

const Patients = () => {
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [patients, setPatients] = useState<IPatient[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoadingList(true);
      const data = await getPatient();
      setPatients(data);
      setIsLoadingList(false);
    })();
  }, []);

  return (
    <>
      <DirectRoute nav="Quản lý bệnh nhân" subnav="Bệnh nhân" />
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <div className="mb-6 w-full flex items-center justify-between gap-5">
          <div>
            <h1 className="text-[18px] text-black font-medium">Danh sách bệnh nhân</h1>
          </div>
          <div className="flex gap-5">
            <Link
              to={'/add-patient'}
              className="text-[18px] font-medium gap-3 border-borderColor border py-2 px-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-transparent hover:border-primaryAdmin"
            >
              <AddIcon className="text-primaryAdmin" />
            </Link>
            <PatientSearch />
          </div>
        </div>
        <div className="w-full">
          {isLoadingList && (
            <div className="mx-auto text-center pt-10">
              <LoadingSpin className="!w-10 !h-10" color="border-primaryAdmin" />
            </div>
          )}
          {!isLoadingList && (
            <table className="min-w-full table-auto border-collapse">
              <thead className="border-b-2 border-primaryAdmin/20 bg-primaryAdmin/5">
                <tr className=" text-gray-700">
                  <th className="p-4 font-medium text-left">#</th>
                  <th className="p-4 font-medium text-left">Tên bệnh nhân</th>
                  <th className="p-4 font-medium text-left">Số điện thoại</th>
                  <th className="p-4 font-medium text-left">Email</th>
                  <th className="p-4 font-medium text-left">Địa chỉ</th>
                  <th className="p-4 font-medium text-left">Giới tính</th>
                  <th className="p-4 font-medium text-left">Trạng thái</th>
                  <th className="p-4 font-medium text-left"></th>
                </tr>
              </thead>
              <tbody>
                {patients &&
                  patients?.map((item, index) => (
                    <tr className="even:bg-[#f5f5f5] hover:bg-yellow-50/45" key={item.id}>
                      <td className="py-2 px-5 text-gray-800">{index + 1}</td>
                      <td className="py-2 px-5 text-gray-800 max-w-[200px] truncate font-semibold">
                        {item?.patient_info?.fullname || (
                          <div className="italic text-gray-400 font-light">Chưa nhập</div>
                        )}
                      </td>
                      <td className="py-2 px-5 text-gray-800 max-w-[200px] truncate">
                        {item?.patient_info?.phone_number || (
                          <div className="italic text-gray-400 font-light">Chưa nhập</div>
                        )}
                      </td>
                      <td className="py-2 px-5 text-gray-800 max-w-[200px] truncate">
                        {item?.patient_info?.email || <div className="italic text-gray-400 font-light">Chưa nhập</div>}
                      </td>
                      <td className="py-2 px-5 text-gray-800 max-w-[200px] truncate">
                        {item?.patient_info?.address || (
                          <div className="italic text-gray-400 font-light">Chưa nhập</div>
                        )}
                      </td>
                      <td className="py-2 px-5 text-gray-800 max-w-[200px] truncate">
                        {convertGender(item?.patient_info?.gender) || (
                          <div className="italic text-gray-400 font-light">Chưa nhập</div>
                        )}
                      </td>
                      <td className="py-2 px-5 max-w-[200px] truncate">
                        <Tags tagsColor={item.status}>{item.status}</Tags>
                      </td>
                      <td className="py-2 px-5 text-end">
                        <div className="relative inline-block text-left">
                          <Link
                            to={`/patient/${item.id}`}
                            className="flex justify-center w-1/2 rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-indigo-500"
                          >
                            <VisibilityIcon className="text-green-500" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

function PatientSearch() {
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
        placeholder="Tìm kiếm bệnh nhân ..."
        control={control}
      />
      <Select name="searchPrescription" placeholder="Bộ lọc bệnh nhân" options={SearchOptions} control={control} />
    </form>
  );
}

export default Patients;
