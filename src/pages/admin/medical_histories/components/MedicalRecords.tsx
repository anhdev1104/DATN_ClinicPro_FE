import { LoadingSkeleton } from '@/components/loading';
import { ModalConfirm } from '@/components/modal';
import convertTime from '@/helpers/convertTime';
import useFetchingData from '@/hooks/useFetchingData';
import { usePrescriptionContextForm } from '@/providers/PrescriptionProvider';
import { getMedicalHistories } from '@/services/medicalHistories.service';
import { MedicalRecord } from '@/types/medicalHistories.type';
import { useState } from 'react';

const MedicalRecords = ({
  layout = 3,
  closeModalMedicalRecords,
}: {
  layout?: string | number;
  closeModalMedicalRecords?: () => void;
}) => {
  const { data: medicalRecords, isLoading } = useFetchingData<MedicalRecord[]>({
    serviceFetching: getMedicalHistories,
    initialData: [],
  });
  const {
    form: { setValue },
    setMedicalRecord,
  } = usePrescriptionContextForm();
  const [targetMedicalRecord, setTargetMedicalRecord] = useState<MedicalRecord>({} as MedicalRecord);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const handleGetMedicalRecord = (item: MedicalRecord) => {
    if (+layout !== 3) return;
    setTargetMedicalRecord(item);
    setValue('medical_histories_id', item.id);
    setValue('patient_id', item.patient.id);
    setMedicalRecord(item);
    setOpenConfirm(true);
  };

  const handleApproveConfirm = () => {
    setOpenConfirm(false);
    closeModalMedicalRecords && closeModalMedicalRecords();
  };

  const handleClosePopupConfirm = () => {
    setOpenConfirm(false);
    setTargetMedicalRecord({} as MedicalRecord);
    setMedicalRecord({} as MedicalRecord);
  };

  return (
    <>
      <div className={`grid grid-cols-${layout} gap-5`}>
        {isLoading && new Array(6).fill(0).map((_, index) => <MedicalRecordSekeleton key={index} />)}
        {!isLoading &&
          medicalRecords.length > 0 &&
          medicalRecords.map(item => (
            <div
              className="border-2 border-gray-300 p-3 rounded-md cursor-pointer hover:bg-primaryAdmin/5 transition-all ease-linear"
              key={item.id}
              onClick={() => handleGetMedicalRecord(item)}
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={item.patient.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">{item.patient.fullname}</h3>
                  <span className="font-light text-xs">{item.patient.phone_number}</span>
                </div>
              </div>
              <div className="text-xs mt-3">
                <p>Mã bệnh án:</p>
                <div className="px-3 py-2 mt-1 bg-white border border-gray-200 font-light rounded-sm truncate">
                  {item.id}
                </div>
              </div>
              <div className="text-xs mt-3">
                <p>Chuẩn đoán bệnh:</p>
                <div
                  className="px-3 py-2 mt-1 bg-white border border-gray-200 font-light rounded-sm truncate"
                  title={item.diagnosis}
                >
                  {item.diagnosis}
                </div>
              </div>
              <div className="text-xs mt-3">
                <p>Bác sĩ phụ trách:</p>
                <div className="px-3 py-2 mt-1 bg-white border border-gray-200 font-light rounded-sm truncate">
                  BS: <span className="font-normal pl-1 text-primaryAdmin">{item.doctor.fullname}</span>
                </div>
              </div>
              <div className="text-xs mt-3">
                <p>Ngày khám bệnh:</p>
                <div className="px-3 py-2 mt-1 bg-white border border-gray-200 font-light rounded-sm truncate" title="">
                  {convertTime(item.created_at)}
                </div>
              </div>
              <div className="text-xs mt-3 bg-primaryAdmin text-white rounded-sm py-2 px-5 text-center transition-all ease-linear hover:bg-opacity-75">
                Chi tiết
              </div>
            </div>
          ))}
      </div>
      <ModalConfirm
        title="Xác nhận bệnh án"
        description={`Vui lòng xác nhận tạo đơn thuốc cho bệnh nhân ${targetMedicalRecord?.patient?.fullname || ''}.`}
        isOpen={openConfirm}
        isClose={handleClosePopupConfirm}
        submit={handleApproveConfirm}
      />
    </>
  );
};

const MedicalRecordSekeleton = () => {
  return (
    <div className="border-2 border-gray-300 p-3 rounded-md cursor-pointer hover:bg-primaryAdmin/5 transition-all ease-linear">
      <div className="flex gap-4 items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <LoadingSkeleton className="w-full h-full object-cover" />
        </div>
        <div>
          <LoadingSkeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <LoadingSkeleton className="mt-4 h-5" />
      <LoadingSkeleton className="mt-4 h-5" />
      <LoadingSkeleton className="mt-4 h-5" />
      <LoadingSkeleton className="mt-4 h-5" />
      <LoadingSkeleton className="mt-4 h-8" />
    </div>
  );
};

export default MedicalRecords;
