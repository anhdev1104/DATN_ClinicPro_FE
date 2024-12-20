import DirectRoute from '@/components/direct';
import { AddIcon, DeleteIcon, SettingsIcon, VisibilityIcon } from '@/components/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteDetailMedicalHistorie, getMedicalHistories } from '@/services/medicalHistories.service';
import { MedicalRecord } from '@/types/medicalHistories.type';
import convertTime from '@/helpers/convertTime';
import { ModalConfirm } from '@/components/modal';
import { toast } from 'react-toastify';
import ModalDetailMedical from '@/components/modal/ModalDetailMedical';
import { useColumn } from '@/hooks/useColumn';
import { Table } from '@/components/common/table/primary';

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getMedicalHistories();
      setMedicalRecords(res);
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

  const column = useColumn<MedicalRecord>([
    {
      header: 'Mã bệnh án',
      accessorKey: 'id',
    },
    {
      header: 'Chẩn đoán',
      accessorKey: 'diagnosis',
    },
    {
      header: 'Bác sĩ',
      accessorKey: 'doctor',
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <img className="size-[30px] rounded-full" src={row.original.doctor.avatar} alt="" />
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold">{row.original.doctor.fullname}</span>
            <span className="text-[12px] opacity-70 truncate max-w-[180px]">{row.original.doctor.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Bệnh nhân',
      accessorKey: 'patient',
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <img className="size-[30px] rounded-full" src={row.original.patient.avatar} alt="" />
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold">{row.original.patient.fullname}</span>
            <span className="text-[12px] opacity-70 truncate max-w-[180px]">{row.original.patient.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Ngày khám',
      accessorKey: 'created_at',
      cell: ({ row }) => <div className="text-[14px]">{convertTime(row.original.created_at || '', true)}</div>,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <button onClick={() => handleClickOpen(row.original.id)}>
            <VisibilityIcon className="text-blue-500" />
          </button>
          <Link to={`/dashboard/medical-histories/${row.original.id}`}>
            <SettingsIcon className="text-yellow-400" />
          </Link>
          <button
            onClick={() => {
              setActiveModal(true);
              setIdMedical(row.original.id);
            }}
          >
            <DeleteIcon className="text-red-500" />
          </button>
        </div>
      ),
    },
  ]);

  return (
    <div>
      <DirectRoute nav="Quản lý bệnh án" subnav="Bệnh án" />
      <div className="bg-white size-full p-[20px] rounded-[26px]">
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
          </div>
        </div>
        <Table columns={column} data={medicalRecords} />
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

export default ListMedicalHistories;
