/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAppointmentbyId, asignAppointment, updateApointment } from '@/services/appointments.service';
import { Button } from '@/components/button';
import { getPatientById } from '@/services/patient.service';
import { getDoctors } from '@/services/user.service';
import dayjs from 'dayjs';
import convertTime from '@/helpers/convertTime';
import { yupResolver } from '@hookform/resolvers/yup';
import { IListAppointment } from '@/types/appointment.type';
import SelectUsers from '@/components/select';
import yup from '@/lib/utils/yup';
const schema = yup.object().shape({
  user_id: yup.string().nullable().required('Vui lòng chọn bác sỹ'),
});
const EditAppointment = () => {
  const [PatientById, setPatientById] = useState<any | null>(null);
  const [EditAppointment, setEditAppointment] = useState<IListAppointment | null>(null);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const convertToOption = users =>
    users.map(user => ({
      label: user.user_info.fullname,
      value: user.id,
    }));
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      if (!id) return;
      const response = await getAppointmentbyId(id);
      setEditAppointment(response.data);
      setValue('user_id', response.data.user.id);
    })();
  }, [id, setValue]);
  useEffect(() => {
    (async () => {
      if (!EditAppointment?.patient?.id) return;
      const dataPatient = await getPatientById(EditAppointment?.patient?.id);
      setPatientById(dataPatient);
    })();
  }, [EditAppointment?.patient?.id]);
  const handelCompleted = async (data: any) => {
    setLoading(true);
    try {
      const res = await updateApointment(EditAppointment?.id, data);
    } catch (error) {
      console.error('Chi tiết lỗi:', error);
      toast.error('Không thể hoàn thành lịch hẹn. Vui lòng thử lại.');
    } finally {
      navigate('/appointments');
      toast.success('Hoàn thành lịch hẹn thành công');
      setLoading(false);
    }
  };
  const handleUpdate = async (data: any) => {
    try {
      const finalData = {
        ...data,
        user_id: data.user_id,
      };
      const res = await asignAppointment(EditAppointment?.id, finalData);
      if (res?.status === 200) {
        toast.success('Chỉnh sửa lịch hẹn thành công');
        navigate('/appointments');
      }
    } catch (error) {
      console.error('Chi tiết lỗi:', error);
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
                {convertTime(EditAppointment?.appointment_date)}
              </div>
            </div>
            <div>
              <label htmlFor="user_id" className="text-sm font-medium mb-1">
                Bác sĩ <span className="text-red-500">*</span>
              </label>
              <SelectUsers
                placeholder="Danh sách bác sĩ"
                options={user}
                name="user_id"
                control={control}
                className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10 mt-[4px]"
              />
            </div>
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chuyên khoa <span className="text-red-500">*</span>
              </label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {EditAppointment?.specialty?.description}
              </div>
            </div>{' '}
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gói khám <span className="text-red-500">*</span>
              </label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {EditAppointment?.package?.name}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chọn trạng thái cuộc hẹn:</label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {' '}
                {EditAppointment?.status}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hình thức đặt lịch </label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {' '}
                {EditAppointment?.booking_type}
              </div>
            </div>
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ghi chú <span className="text-red-500">*</span>
              </label>
              <div className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 h-10">
                {EditAppointment?.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <Button
          type="submit"
          className="bg-primaryAdmin text-white hover:bg-primaryAdmin/50 px-6 py-2 rounded-md transition duration-200"
        >
          Chỉnh sửa lịch hẹn
        </Button>
        <Button
          className=" bg-red-500 hover:bg-red-600 text-white  px-6 py-2 rounded-md transition duration-200"
          onClick={handleSubmit(handelCompleted)}
        >
          Hoàn thành lịch hẹn
        </Button>
      </div>
    </form>
  );
};

export default EditAppointment;
