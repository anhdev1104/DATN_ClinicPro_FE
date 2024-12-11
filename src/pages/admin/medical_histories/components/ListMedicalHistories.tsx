import DirectRoute from '@/components/direct';
import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import Select from '@/components/select';
import { AddIcon, DeleteIcon, SettingsIcon, VisibilityIcon } from '@/components/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteDetailMedicalHistorie, getMedicalHistories } from '@/services/medicalHistories.service';
import { MedicalRecord } from '@/types/medicalHistories.type';
import convertTime from '@/helpers/convertTime';
import { ModalConfirm } from '@/components/modal';
import { toast } from 'react-toastify';
import LoadingSpin from '@/components/loading';
import ModalDetailMedical from '@/components/modal/ModalDetailMedical';

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

interface ListMedicalRecord {
  navigate: () => void;
}

const ListMedicalHistories = ({ navigate }: ListMedicalRecord) => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [idMedical, setIdMedical] = useState<string | null>(null);
  const [open, setOpen] = useState<{ status: boolean; id: string }>({
    status: false,
    id: '#',
  });
  const [activeModal, setActiveModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getMedicalHistories();
      setMedicalRecords(res);
      setLoading(false);
    })();
  }, []);

  const handleClose = () => {
    setOpen({ status: false, id: '#' });
  };

  const handleClickOpen = (id: string) => {
    setOpen({ status: true, id });
  };

  const handleCloseModal = () => {
    setActiveModal(!activeModal);
  };

  const handleDelete = async (id: any) => {
    setIsLoading(true);
    const res = await deleteDetailMedicalHistorie(id);
    setIsLoading(false);
    handleCloseModal();
    const newMedicalRecord = await getMedicalHistories();
    toast.success(res.message, { position: 'top-right' });
    setMedicalRecords(newMedicalRecord);
  };

  return (
    <div>
      <DirectRoute nav="Quản lý bệnh án" subnav="Bệnh án" />
      <div className="bg-white size-full p-[20px] rounded-[26px] min-h-[500px]">
        <div className="mb-6 w-full flex items-center justify-between gap-5">
          <div>
            <h1 className="text-[18px] text-black font-medium">Danh sách bệnh án</h1>
          </div>
          <div className="flex gap-5">
            <button
              onClick={navigate}
              className="text-[18px] font-medium gap-3 border-borderColor border py-2 px-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-transparent hover:border-primaryAdmin"
            >
              <AddIcon className="text-primaryAdmin" />
            </button>
            <MedicalRecordSearch />
          </div>
        </div>
        <table className="min-w-full table-auto border-collapse">
          <thead className="border-b-2 border-primaryAdmin/20 bg-primaryAdmin/5">
            <tr className=" text-gray-700">
              <th className="p-4 font-medium text-left">Mã bệnh án</th>
              <th className="p-4 font-medium text-left">Chẩn đoán</th>
              <th className="p-4 font-medium text-left">Bác sĩ</th>
              <th className="p-4 font-medium text-left">Người bệnh</th>
              <th className="p-4 font-medium text-left">Ngày khám</th>
              <th className="p-4 font-medium text-left"></th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              medicalRecords?.length > 0 ? (
                medicalRecords.map(record => (
                  <tr className="even:bg-[#f5f5f5] hover:bg-yellow-50/45 py-3" key={record.id}>
                    <td className="py-2 px-5 text-gray-800 max-w-[250px] truncate">{record.id}</td>
                    <td className="py-2 px-5 text-gray-800 max-w-[200px] truncate">{record.diagnosis}</td>
                    <td className="py-2 px-5 text-gray-800">
                      <div className="flex gap-2">
                        <img className="size-[30px] rounded-full" src={record.doctor.avatar} alt="" />
                        <div className="flex flex-col">
                          <span className="text-[14px] font-semibold">{record.doctor.fullname}</span>
                          <span className="text-[12px] opacity-70 truncate max-w-[180px]">{record.doctor.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-5 text-gray-800">
                      <div className="flex gap-2">
                        <img className="size-[30px] rounded-full" src={record.patient.avatar} alt="" />
                        <div className="flex flex-col">
                          <span className="text-[14px] font-semibold">{record.patient.fullname}</span>
                          <span className="text-[12px] opacity-70 truncate max-w-[180px]">{record.patient.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-5 text-gray-800 max-w-[170px] truncate">
                      {convertTime(record.created_at || '', true)}
                    </td>
                    <td className="py-2 px-5 text-gray-800 flex gap-1 max-w-[150px]">
                      <button
                        onClick={() => handleClickOpen(record.id)}
                        className="flex justify-center w-[15%] rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-indigo-500"
                      >
                        <VisibilityIcon className="text-blue-500" />
                      </button>
                      <Link
                        to={`/dashboard/medical-histories/${record.id}`}
                        className="flex justify-center w-[15%] rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-indigo-500"
                      >
                        <SettingsIcon className="text-yellow-400" />
                      </Link>
                      <button
                        onClick={() => {
                          setActiveModal(true);
                          setIdMedical(record.id);
                        }}
                        className="text-red-500 flex justify-center w-[15%] rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-indigo-500"
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-800">
                    Không có bệnh án nào
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  <LoadingSpin className="!w-10 !h-10" color="border-primaryAdmin" />
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <ModalConfirm
          description="Dữ liệu sẽ không thể khôi phục"
          title="Bạn có chắc muốn xóa ?"
          isClose={handleCloseModal}
          isOpen={activeModal}
          submit={() => handleDelete(idMedical)}
          isLoading={isLoading}
          className="bg-red-500 hover:bg-red-600 text-white"
        />
      </div>
      {open.status && <ModalDetailMedical close={handleClose} statusLog={open.status} id={open.id} />}
    </div>
  );
};

function MedicalRecordSearch() {
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
        placeholder="Tìm kiếm bệnh án ..."
        control={control}
      />
      <Select name="searchPrescription" placeholder="Bộ lọc bệnh án" options={SearchOptions} control={control} />
    </form>
  );
}

export default ListMedicalHistories;
