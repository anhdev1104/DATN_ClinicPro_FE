/* eslint-disable no-console */
import { Dialog } from '@mui/material';
import { Button } from '@/components/button';
import Label from '@/components/label';
import Field from '@/components/field';
import Input from '@/components/input';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { cancelledAppointment, getAppointmentbyId, getAppointmentAsign } from '@/services/appointments.service';
import { getPatientById } from '@/services/patient.service';
import dayjs from 'dayjs';
import { IListAppointment } from '@/types/appointment.type';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import convertTime from '@/helpers/convertTime';
import { toast } from 'react-toastify';
const schema = yup.object().shape({
  cancellation_reason: yup.string().trim().required('Lý do hủy lịch không được để trống'),
});

const AppointmentDetail = () => {
  const [PatientById, setPatientById] = useState<any | null>(null);
  const [AppointmentDetail, setAppointmentDetail] = useState<IListAppointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      const response = await getAppointmentbyId(id);
      const appointmentData = response.data;
      setAppointmentDetail(appointmentData);
      setLoading(false);
    })();
  }, [id]);
  useEffect(() => {
    (async () => {
      if (!AppointmentDetail?.patient?.id) return;
      const dataPatient = await getPatientById(AppointmentDetail?.patient?.id);
      setPatientById(dataPatient);
    })();
  }, [AppointmentDetail?.patient?.id]);
  const handleClickOpen = (id: IListAppointment | null, action = false) => {
    setOpen({ status: true, id, action });
  };

  const [open, setOpen] = useState<{ status: boolean; id: IListAppointment | null; action: boolean }>({
    status: false,
    id: null,
    action: false,
  });
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  return (
    <div className="rounded-2xl">
      <div className="flex justify-center items-center">
        <div className="bg-white shadow-md rounded-md w-[60%] h-auto py-6 px-6">
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
              <img className="w-full h-full object-cover" src={PatientById?.patient_info?.avatar} alt="User Profile" />
            </div>
            <div className="ml-4">
              <div className="flex gap-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {loading ? '.....' : PatientById?.patient_info?.fullname}
                </h2>
                <span className="text-gray-700 text-sm mt-1">
                  - {loading ? '.....' : PatientById?.patient_info?.gender}
                </span>
              </div>
              <p className="text-sm text-gray-500">{dayjs(PatientById?.patient_info?.dob).format('DD/MM/YYYY')}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Email:</label>
              <input
                type="text"
                readOnly
                value={PatientById?.patient_info?.email}
                className="w-full border border-gray-300 rounded-md mt-1 p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Ngày đặt lịch:</label>
              <input
                type="text"
                readOnly
                value={AppointmentDetail?.appointment_date}
                className="w-full border border-gray-300 rounded-md mt-1 p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Chuyên khoa:</label>
              <input
                type="text"
                readOnly
                value={AppointmentDetail?.specialty?.description}
                className="w-full border border-gray-300 rounded-md mt-1 p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Gói khám:</label>
              <input
                type="text"
                readOnly
                value={AppointmentDetail?.package?.name}
                className="w-full border border-gray-300 rounded-md mt-1 p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Thời gian hẹn khám:</label>
              <input
                type="text"
                readOnly
                value={convertTime(AppointmentDetail?.appointment_date)}
                className="w-full border border-gray-300 rounded-md mt-1 p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          <div className="flex mt-6 gap-4 ">
            <button
              className="w-full hover:bg-blue-600  bg-blue-500 text-white py-2 px-4 rounded-md  transition duration-200"
              onClick={() => handleClickOpen(AppointmentDetail, true, true)}
            >
              Xác nhận lịch hẹn
            </button>
            <button
              className="w-full  bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md  transition duration-200"
              onClick={() => {
                openDialog();
                handleClickOpen(AppointmentDetail, false);
              }}
            >
              Hủy lịch hẹn
            </button>
          </div>
        </div>
      </div>
      <ModalCanclled close={closeDialog} statusLog={isDialogOpen} id={id} iAction={open.action} appointment={open.id} />
    </div>
  );
};
interface ModalCanclled {
  close: () => void;
  statusLog: boolean;
  appointment?: IListAppointment | null;
  iAction?: boolean;
  id: string | undefined;
}
function ModalCanclled({ close, statusLog, id, iAction, appointment }: ModalCanclled) {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
  useEffect(() => {
    if (iAction && appointment) {
      (async () => {
        const res = await getAppointmentAsign(String(id));
        console.log(res);
        if (res.data?.status === 'confirmed') {
          toast.success('Xác nhận lịch hẹn thành công');
          reset();
        } else {
          toast.error('Vui lòng tra lại trạng thái lịch hẹn ');
        }
        navigate('/appointments');
      })();
    }
  }, [id, iAction, appointment, reset, navigate]);
  const onSubmit = async (data: any) => {
    try {
      const res = await cancelledAppointment(String(id), data);
      if (res && res.status === 200) {
        toast.success('Hủy lịch hẹn thành công');
        close();
        navigate('/appointments');
      } else {
        toast.error('Vui lòng kiểm tra lại trạng thái cuộc hẹn.');
        reset();
      }
    } catch (error) {
      console.error('Chi tiết lỗi:', error);
    }
  };
  return (
    <Dialog
      open={statusLog}
      onClose={close}
      PaperProps={{
        style: {
          backgroundColor: '#f5f5f5',
          width: '700px',
          borderRadius: '8px',
        },
      }}
    >
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
          <div className="flex w-full gap-10 mb-5">
            <Field className="flex gap-3 flex-col">
              <Label htmlFor="cancellation_reason">Lý do hủy lịch:</Label>
              <Input
                className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                placeholder="Nhập lý do hủy lịch..."
                name="cancellation_reason"
                type="text"
                control={control}
              />
            </Field>
          </div>
          <div className="flex gap-3 justify-end">
            <Button isLoading={isSubmitting} type="submit" styled="normal">
              Xác nhận
            </Button>
            <Button onClick={close} type="button" styled="secondary">
              Đóng
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default AppointmentDetail;
