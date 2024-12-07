import { LoadingSkeleton } from '@/components/loading';
import convertTime from '@/helpers/convertTime';
import useFetchingData from '@/hooks/useFetchingData';
import { getMedicalHistories } from '@/services/medicalHistories.service';
import { MedicalRecord } from '@/types/medicalHistories.type';

const MedicalRecords = ({ layout = 3 }: { layout?: string | number }) => {
  const { data: medicalRecords, isLoading } = useFetchingData<MedicalRecord[]>({
    serviceFetching: getMedicalHistories,
    initialData: [],
  });

  return (
    <div className={`grid grid-cols-${layout} gap-5`}>
      {isLoading && new Array(6).fill(0).map((_, index) => <MedicalRecordSekeleton key={index} />)}
      {!isLoading &&
        medicalRecords.length > 0 &&
        medicalRecords.map(item => (
          <div
            className="border-2 border-gray-300 p-3 rounded-md cursor-pointer hover:bg-primaryAdmin/5 transition-all ease-linear"
            key={item.id}
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
              <div className="px-3 py-2 mt-1 bg-white border border-gray-200 font-light rounded-sm">{item.id}</div>
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
