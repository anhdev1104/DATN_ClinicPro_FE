import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from '@/components/icons';
import Input from '@/components/input';
import LoadingSpin from '@/components/loading';
import Tags from '@/components/tags';
import { getPatient } from '@/services/medicalHistories.service';
import { IPatient } from '@/types/patient.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const searchSchema = yup.object().shape({
  search: yup.string().min(3, 'Từ khóa tìm kiếm phải ít nhất 3 ký tự.').required('Vui lòng nhập từ khoá tìm kiếm!'),
});

interface ModalPatientProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  onSelectPatient: (id: string | null, name: string | null) => void;
  selectedPatientId?: string | null;
}

const FormPatient: FC<ModalPatientProps> = ({
  isDialogOpen,
  handleCloseDialog,
  onSelectPatient,
  selectedPatientId,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { search: '' },
    resolver: yupResolver(searchSchema),
  });
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [expandedPatientId, setExpandedPatientId] = useState<string | null>(null);
  const [currentSelectedPatientId, setCurrentSelectedPatientId] = useState<string | null | undefined>(
    selectedPatientId,
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getPatient();
        setPatients(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res = await getPatient(data.search);
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPatientId) {
      setCurrentSelectedPatientId(selectedPatientId);
    }
  }, [selectedPatientId]);

  const toggleExpand = (id: string) => {
    setExpandedPatientId(prev => (prev === id ? null : id));
  };

  const handleSelectPatient = (id: string | null, name: string | null) => {
    const isSelected = currentSelectedPatientId === id;
    setCurrentSelectedPatientId(isSelected ? null : id);
    onSelectPatient(isSelected ? null : id, isSelected ? null : name);
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          overflowY: 'scroll',
          '::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        },
      }}
      PaperProps={{
        style: {
          backgroundColor: '#fff',
          padding: '20px',
          paddingBottom: '50px',
          width: '1000px',
          height: '800px',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 'none',
          overflowY: 'scroll',
        },
      }}
      open={isDialogOpen}
      onClose={handleCloseDialog}
    >
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[18px] font-bold">Danh sách bệnh nhân</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-[0_0_50%] flex justify-end items-center gap-3">
          <Input
            colorGlass="text-primaryAdmin"
            className="placeholder:text-sm text-sm text-primaryAdmin h-[40px]"
            control={control}
            name="search"
            placeholder="Tìm bệnh nhân ..."
          />
          <button
            type="submit"
            className="w-[53px] h-[40px] flex items-center justify-center bg-primaryAdmin rounded-[6px] transition-all duration-300 ease-linear hover:bg-white hover:border-primaryAdmin border border-transparent group"
          >
            <SearchIcon className="text-white group-hover:text-primaryAdmin transition-all" />
          </button>
        </form>
      </div>

      <div className="w-full h-full flex flex-col gap-3 overflow-y-auto pr-3 scroll-select">
        {!loading && patients.length > 0 ? (
          patients.map(patient => (
            <label
              htmlFor={patient.id}
              key={patient.id}
              className="py-3 px-4 gap-2 flex flex-col items-stretch rounded-lg border border-borderColor hover:bg-slate-100 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <input
                    id={patient.id}
                    type="checkbox"
                    className="form-checkbox w-5 h-5 text-blue-600 cursor-pointer"
                    checked={currentSelectedPatientId === patient.id}
                    onChange={() => handleSelectPatient(patient?.id, patient?.patient_info?.fullname)}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold">{patient?.patient_info?.fullname}</span>
                    <span className="text-sm opacity-70">{patient?.patient_info?.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleExpand(patient.id)}
                  className="text-blue-500 hover:underline flex items-center gap-1"
                >
                  {expandedPatientId === patient?.id ? (
                    <>
                      Xem chi tiết <ArrowUpIcon />
                    </>
                  ) : (
                    <>
                      Xem chi tiết <ArrowDownIcon />
                    </>
                  )}
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedPatientId === patient.id ? 'max-h-[300px]' : 'max-h-0'
                }`}
              >
                <div className="mt-3 p-3 border-t border-gray-200">
                  <p>
                    <strong>Địa chỉ:</strong>{' '}
                    {patient?.patient_info?.address?.length > 0 ? (
                      patient.patient_info.address
                    ) : (
                      <span className="text-gray-500 italic">Chưa nhập</span>
                    )}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong>{' '}
                    {patient?.patient_info?.phone_number?.length > 0 ? (
                      patient.patient_info.phone_number
                    ) : (
                      <span className="text-gray-500 italic">Chưa nhập</span>
                    )}
                  </p>
                  <p>
                    <strong>Ngày sinh:</strong>{' '}
                    {patient?.patient_info?.dob?.length > 0 ? (
                      patient.patient_info.dob
                    ) : (
                      <span className="text-gray-500 italic">Chưa nhập</span>
                    )}
                  </p>
                  <p>
                    <strong>Giới tính:</strong>{' '}
                    {patient?.patient_info?.gender?.length > 0 ? (
                      patient.patient_info.gender === 'male' ? (
                        'Nam'
                      ) : (
                        'Nữ'
                      )
                    ) : (
                      <span className="text-gray-500 italic">Chưa nhập</span>
                    )}
                  </p>
                  <p className="flex gap-3 items-center">
                    <strong>Trạng thái bảo hiểm:</strong>{' '}
                    {patient?.status?.length > 0 ? (
                      <Tags tagsColor={patient.status}>{patient.status}</Tags>
                    ) : (
                      <span className="text-gray-500 italic">Chưa nhập</span>
                    )}
                  </p>
                </div>
              </div>
            </label>
          ))
        ) : !loading ? (
          <div className="text-center text-[18px] font-bold size-full flex justify-center items-center">
            Chưa tìm thấy bệnh nhân nào
          </div>
        ) : (
          <div className="mx-auto text-center pt-10">
            <LoadingSpin className="!w-10 !h-10" color="border-primaryAdmin" />
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default FormPatient;
