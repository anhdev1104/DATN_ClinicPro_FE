/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { getAppointmentbyId, updateApointment } from '@/services/appointments.service';
import { getPatientById } from '@/services/patient.service';
import { getDoctors } from '@/services/user.service';
import Field from '@/components/field';
import Label from '@/components/label';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { IListAppointment } from '@/types/appointment.type';
import SelectUsers from '@/components/select';
import { APPOINTMENT_STATUS, BOOKING_TYPE } from '@/constants/define';
import yup from '@/lib/utils/yup';
const schema = yup.object().shape({
  booking_type: yup.string().trim().required(),
  user_id: yup.string().trim().required(),
  status: yup.string().trim().required(),
});
``;
const AppointmentDetail = () => {
  const [PatientById, setPatientById] = useState<any | null>(null);
  const [AppointmentDetail, setAppointmentDetail] = useState<IListAppointment | null>(null);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const convertToOption = users =>
    users.map(user => ({
      label: user.user_info.fullname,
      value: user.id,
    }));
  const { control, handleSubmit, register } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const userRes = await getDoctors();
        const doctorOptions = convertToOption(userRes);
        setUser(doctorOptions);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng hoặc bệnh nhân:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const { id } = useParams();
  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      const response = await getAppointmentbyId(id);
      const appointmentData = response.data;
      setAppointmentDetail(appointmentData);
    })();
  }, [id]);
  useEffect(() => {
    (async () => {
      if (!AppointmentDetail?.patient?.id) return;
      const dataPatient = await getPatientById(AppointmentDetail?.patient?.id);
      setPatientById(dataPatient);
    })();
  }, [AppointmentDetail?.patient?.id]);
  const handleUpdate = async (data: any) => {
    try {
      console.log('Data to submit:', data);
      const finalData = {
        ...data,
        user_id: data.user_id,
        booking_type: data.booking_type,
        status: data.status,
        patient_id: PatientById?.id,
        appointment_date: AppointmentDetail?.appointment_date,
        specialty_id: AppointmentDetail?.specialty?.id,
        package_id: AppointmentDetail?.package?.id,
        cancellation_reason: AppointmentDetail?.cancellation || null,
        total_amount: AppointmentDetail?.total_amount || null,
        deposit_amount: AppointmentDetail?.deposit_amount || null,
        appointment_type: AppointmentDetail?.appointment_type | null,
      };
      console.log('Final data being sent:', finalData);
      const res = await updateApointment(String(id), finalData);
      console.log('Response from API:', res);
      if (res.errors) {
        toast.error('Cập nhật gói khám thất bại');
      }
    } catch (error) {
      console.error('Chi tiết lỗi:', error);
      toast.error('Lỗi xảy ra trong quá trình cập nhật');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bg-white rounded-2xl p-6" onSubmit={handleSubmit(handleUpdate)}>
      <div>
        <div className="mb-8">
          <div class="flex items-center gap-5 pb-4 ">
            <div class="w-20 h-20 overflow-hidden">
              <img class="w-full h-full object-cover" src={PatientById?.patient_info?.avatar} alt="User Profile" />
            </div>
            <h2 className="text-lg font-bold mb-4">Lịch hẹn của bệnh nhân {PatientById?.patient_info?.fullname}</h2>
          </div>
          <div className="grid grid-cols-3 gap-4  pb-4">
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {PatientById?.patient_info?.fullname}
              </div>
            </div>
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {dayjs(PatientById?.patient_info?.dob).format('DD/MM/YYYY')}
              </div>
            </div>
            <div className="flex flex-col items-start">
              {/* Tiêu đề */}
              <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative">
                  <input type="radio" name="gender" className="hidden peer" defaultChecked />
                  <div className="w-5 h-5 border-2 border-teal-400 rounded-full flex items-center justify-center peer-checked:bg-teal-400">
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  </div>
                </div>
                <span className="text-gray-700 text-sm">{PatientById?.patient_info?.gender}</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4  pb-4">
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {' '}
                {PatientById?.patient_info?.phone_number}
              </div>
            </div>
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {' '}
                {PatientById?.patient_info?.email}
              </div>
            </div>
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {' '}
                {PatientById?.patient_info?.address}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-4 pb-4">
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian hẹn khám</label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {dayjs(AppointmentDetail?.appointment_date).tz('Asia/Ho_Chi_Minh').format('HH:mm - DD/MM/YYYY ')}
              </div>
            </div>
            <Field>
              <Label htmlFor="user_id" className="text-sm font-medium mb-1">
                Bác sĩ <span className="text-red-500">*</span>
              </Label>
              <SelectUsers
                placeholder="Danh sách bác sĩ"
                options={user}
                name="user_id"
                control={control}
                className="w-full h-[37px]  border border-gray-300 rounded-md p-2 focus:outline-none text-[#797979] text-[14px]"
              />
            </Field>
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chuyên khoa <span className="text-red-500">*</span>
              </label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {AppointmentDetail?.specialty?.description}
              </div>
            </div>{' '}
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gói khám <span className="text-red-500">*</span>
              </label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {AppointmentDetail?.package?.name}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chọn trạng thái cuộc hẹn:</label>
              <select
                {...register('status')}
                defaultValue={AppointmentDetail?.status}
                className="w-full border rounded-md p-2 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(APPOINTMENT_STATUS).map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hình thức đặt lịch </label>
              <select
                {...register('booking_type')}
                defaultValue={AppointmentDetail?.booking_type}
                className="w-full border rounded-md p-2 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(BOOKING_TYPE).map(booking_type => (
                  <option key={booking_type} value={booking_type}>
                    {booking_type}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ghi chú <span className="text-red-500">*</span>
              </label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {AppointmentDetail?.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          type="submit"
          className="bg-primaryAdmin text-white hover:bg-primaryAdmin/50 px-6 py-2 rounded-md transition duration-200"
        >
          {loading ? 'Đang cập nhật...' : 'Cập nhật '}
        </button>
      </div>
    </form>
  );
};

export default AppointmentDetail;
