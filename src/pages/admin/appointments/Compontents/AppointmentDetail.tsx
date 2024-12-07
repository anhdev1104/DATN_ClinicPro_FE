/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { getAppointmentbyId } from '@/services/appointments.service';
import Input from '@/components/input';
import Field from '@/components/field';
import Label from '@/components/label';

const AppointmentDetail = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const {
    control,
    setValue,
    handleSubmit,
    formState: { error },
  } = useForm();
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const response = await getAppointmentbyId(id);
        const appointmentData = response.data;
        console.log('Appointment data:', appointmentData);
        setAppointment(appointmentData);
        setValue('fullname', appointmentData?.user?.user_info?.fullname || 'null');
        setValue('date', appointmentData?.appointment_date || '');
      } catch (err) {
        setError('Không thể tải dữ liệu cuộc hẹn');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id, setValue]);
  const onSubmit = data => {
    console.log('Form data:', data);
    toast.success('Cập nhật thông tin thành công!');
  };

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Patient Details</h2>
          <div class="flex items-center gap-5 pb-4 ">
            <div class="w-20 h-20 overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/my-project-29fd5.appspot.com/o/files%2F1733391783_1.jpg?alt=media"
                alt="User Profile"
              />
            </div>
            <p class="text-2xl font-semibold truncate">{appointment?.user?.user_info?.fullname || 'N/A'}</p>
          </div>
          <div className="grid grid-cols-3 gap-4  pb-4">
            <div>
              <Field>
                <Label className="block text-sm font-medium mb-1" htmlFor="fullname">
                  Họ và tên
                </Label>
                <Input
                  name="fullname"
                  type="text"
                  className="w-full h-[37px]  border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  control={control}
                />
              </Field>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Trạng thái</label>
              <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Pending</option>
                <option>Doctor A</option>
                <option>Doctor B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Giới tính</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="gender" className="focus:ring-blue-500" />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="gender" className="focus:ring-blue-500" />
                  <span>Female</span>
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4  pb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Số điện thoại</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Địa chỉ</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Appointment Details</h2>
          <div className="grid grid-cols-3 gap-4 pb-4">
            <div>
              <Field>
                <Label htmlFor="date" className="block text-sm font-medium mb-1">
                  Date of Appointment *
                </Label>
                <Input
                  name="date"
                  type="text"
                  className="w-full h-[37px] border rounded-md p-2 outline-none !font-normal !text-dark bg-white  focus:ring-2 focus:ring-blue-500 border-gray-300 focus:outline-none  "
                  control={control}
                />
              </Field>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">From *</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Consulting Doctor</label>
              <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Doctor</option>
                <option>Doctor A</option>
                <option>Doctor B</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <label className="block text-sm font-medium mb-1">Treatment</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium mb-1">Notes *</label>
              <textarea
                rows={1}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button type="button" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AppointmentDetail;
