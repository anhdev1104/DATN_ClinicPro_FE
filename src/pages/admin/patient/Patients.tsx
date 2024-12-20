import DirectRoute from '@/components/direct';
import { AddIcon, VisibilityIcon } from '@/components/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IPatient } from '@/types/patient.type';
import { getPatient } from '@/services/patient.service';
import { Table } from '@/components/common/table/primary';
import { useColumn } from '@/hooks/useColumn';

const Patients = () => {
  const [patients, setPatients] = useState<IPatient[]>([]);

  const fetchPatients = async () => {
    try {
      const data = await getPatient();
      setPatients(data.data || []);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const column = useColumn<IPatient>([
    {
      accessorKey: 'patient_info.fullname',
      header: 'Tên',
    },
    {
      accessorKey: 'patient_info.phone_number',
      header: 'Số điện thoại',
    },
    {
      accessorKey: 'patient_info.email',
      header: 'Email',
    },
    {
      accessorKey: 'patient_info.address',
      header: 'Địa chỉ',
    },
    {
      accessorKey: 'patient_info.gender',
      header: 'Giới tính',
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Link to={`/patient/${row.original.id}`}>
          <VisibilityIcon className="text-blue-400" />
        </Link>
      ),
    },
  ]);

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
          </div>
        </div>
        <div className="w-full">
          <Table columns={column} data={patients}></Table>
        </div>
      </div>
    </>
  );
};

export default Patients;
