import DirectRoute from '@/components/direct';
import { AddIcon, VisibilityIcon } from '@/components/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IPatient } from '@/types/patient.type';
import { getPatient, updatePatient } from '@/services/patient.service';
import { Table } from '@/components/common/table/primary';
import { useColumn } from '@/hooks/useColumn';
import { UserInfo } from '@/components/user-info/UserInfo';
import convertGender from '@/helpers/convertToGender';
import convertToStatus from '@/helpers/convertToStatus';

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
      cell: ({ row }) => (
        <UserInfo
          key={row.original.id}
          avatar={row.original.patient_info.avatar}
          fullname={row.original.patient_info.fullname}
          email={row.original.patient_info.email}
        />
      ),
    },
    {
      accessorKey: 'patient_info.phone_number',
      header: 'Số điện thoại',
      cell: ({ row }) => (
        <div className="truncate max-w-[100px]">
          {row.original.patient_info.phone_number ? (
            row.original.patient_info.phone_number
          ) : (
            <div className="italic text-[12px] text-gray-400 text-start">Chưa nhập</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'patient_info.address',
      header: 'Địa chỉ',
      cell: ({ row }) => (
        <div className="truncate max-w-[100px]">
          {row.original.patient_info.address ? (
            row.original.patient_info.address
          ) : (
            <div className="italic text-[12px] text-gray-400 text-start">Chưa nhập</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'patient_info.gender',
      header: 'Giới tính',
      cell: ({ row }) => (
        <div className="truncate max-w-[100px]">
          {row.original.patient_info.gender ? (
            convertGender(row.original.patient_info.gender)
          ) : (
            <div className="italic text-[12px] text-gray-400 text-start">Chưa nhập</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => {
        let styled;
        if (row.original.status === 'active') {
          styled = 'bg-[#f0fcf2] text-[#007b35] border-[#89c096]';
        } else if (row.original.status === 'inactive') {
          styled = 'bg-[#fff4f1] text-[#be1508] border-[#f29585]';
        } else {
          styled = 'bg-[#fdeed9] text-[#c05a2b] border-[#f3a47c]';
        }

        return (
          <div className={`${styled} px-3 py-1 text-[12px] text-center rounded-xl w-max border`}>
            {convertToStatus(row.original.status)}
          </div>
        );
      },
    },
    {
      accessorKey: 'user.status',
      header: 'Trạng thái tài khoản',
      cell: ({ row }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [status, setStatus] = useState(row.original.user?.status || 'inactive');

        const handleToggle = async () => {
          const newStatus = status === 'active' ? 'disabled' : 'active';
          setStatus(newStatus);
          const finalStatus = {
            account_status: newStatus,
          };
          await updatePatient(row.original.id, finalStatus);
        };

        if (!row.original.user) {
          return <div className="italic text-[12px] text-gray-400 text-start">Chưa có tài khoản</div>;
        }

        return (
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                status === 'active' ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  status === 'active' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
              {status === 'active' ? 'Active' : 'Disabled'}
            </span>
          </div>
        );
      },
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
