import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '@/components/input';
import { MoreVertIcon, AddIcon } from '@/components/icons';
import { IListAppointment } from '@/types/appointment.type';
import DirectRoute from '@/components/direct';
import { getAppointments, deleteAppointment } from '@/services/appointments.service';
import { Dialog } from '@mui/material';
import convertTime from '@/helpers/convertTime';
import { toast } from 'react-toastify';
interface ModalDetail {
  close: () => void;
  statusLog: boolean;
  appointment?: IListAppointment | null;
}
const ListAppointment = () => {
  const [appointments, setAppointments] = useState<IListAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  const [open, setOpen] = useState<{ status: boolean; id: IListAppointment | null }>({
    status: false,
    id: null,
  });
  const handleClickOpen = (id: IListAppointment) => {
    setOpen({ status: true, id });
  };

  const handleClose = () => {
    setOpen({ status: false, id: null });
  };

  const handleDelete = async (id: string) => {
    await deleteAppointment(id);
    setAppointments(prevAppointments => prevAppointments.filter(pkg => pkg.id !== id));
    toast.success('Xóa gói khám thành công!');
  };
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentResponse = await getAppointments();
        setAppointments(appointmentResponse.data || []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setError('Không thể tải danh sách gói khám. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <section className="package">
      <DirectRoute nav="Quản lý lịch hẹn" subnav="Danh sách lịch hẹn" />
      <div className="bg-white rounded-2xl">
        <div className="doctor-table-blk mb-2 pt-5 px-4 flex items-center flex-wrap gap-7">
          <h1 className="text-lg font-semibold mb-0">Danh sách lịch hẹn</h1>
          <div className="flex items-center flex-wrap gap-7">
            <div className="top-nav-search table-search-blk">
              <SearchAdmin />
            </div>
            <div className="transition-all w-12 h-12 rounded-[9px] border border-borderColor font-medium bg-[#f3f4f7] outline-none flex items-center justify-center">
              <button>
                <AddIcon className="text-primaryAdmin" />
              </button>
            </div>
          </div>
        </div>
        <div className="list-package p-4">
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="border-b-2 border-primaryAdmin/20 bg-primaryAdmin/5">
                  <th className="p-4 text-center  font-medium">ID Bệnh nhân</th>
                  <th className="p-4 text-center font-medium">Chuyên khoa</th>
                  <th className="p-4 text-center font-medium">Gói khám</th>
                  <th className="p-4 text-center font-medium">Thời gian hẹn khám</th>
                  <th className="p-4 text-center font-medium">Hình thức đặt hẹn</th>
                  <th className="p-4 text-center font-medium">Status</th>
                  <th className="p-4 text-center font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((pkg, index) => (
                  <tr key={index} className="odd">
                    <td className="p-4 text-center text-gray-800 w-[15%] ">{pkg?.patient?.id}</td>
                    <td className="p-4 text-center text-gray-600 w-[15%]">{pkg?.specialty?.name}</td>
                    <td className="p-4 text-center  text-gray-600 w-[15%]">{pkg?.package?.name}</td>
                    <td className="p-4 text-center text-gray-600 w-[15%]">{convertTime(pkg.appointment_date)}</td>
                    <td className="p-4 text-center text-gray-800 w-[15%] ">{pkg.booking_type}</td>
                    <td
                      className={`p-4 text-center w-[15%]  ${
                        pkg.status === 'pending'
                          ? ' text-yellow-500'
                          : pkg.status === 'confirmed'
                            ? 'text-green-500'
                            : 'text-red-500'
                      }`}
                    >
                      {pkg.status}
                    </td>
                    <td className="p-4 w-4/12 flex items-center">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                          onClick={() => handleToggle(pkg.id)}
                        >
                          <MoreVertIcon />
                        </button>
                        {selectedId === pkg.id && (
                          <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white overflow-hidden">
                            <Link
                              to=""
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleToggle(pkg.id);
                                handleClickOpen(pkg);
                              }}
                            >
                              Chi tiết
                            </Link>
                            <Link
                              to={`/appointments/${pkg.id}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleToggle(pkg.id)}
                            >
                              Sửa
                            </Link>
                            <Link
                              to="#"
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleDelete(pkg.id)}
                            >
                              Xóa bỏ
                            </Link>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {open.status && <ModalDetail close={handleClose} statusLog={open.status} appointment={open.id} />}
    </section>
  );
};

function SearchAdmin() {
  const { control } = useForm({
    mode: 'onChange',
  });

  return (
    <form className="w-[300px]">
      <Input
        name="searchadmin"
        className="text-current pl-10 border-none"
        isGlass
        colorGlass="text-primaryAdmin"
        placeholder="Tìm kiếm thông tin ..."
        control={control}
      />
    </form>
  );
}

function ModalDetail({ close, statusLog, appointment }: ModalDetail) {
  return (
    <Dialog
      open={statusLog}
      onClose={close}
      PaperProps={{
        style: {
          backgroundColor: 'white',
          width: '700px',
          height: 'auto',
          maxWidth: '700px',
          borderRadius: '8px',
          overflowY: 'hidden',
        },
      }}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Chi tiết lịch hẹn </h2>
        <div className="card-box p-6 ">
          <h3 className="card-title text-lg font-semibold text-gray-700 mb-4">
            {appointment?.user?.user_info?.fullname}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-block">
              <label className="focus-label text-sm font-medium text-gray-600">ID Bệnh nhân</label>
              <input
                type="text"
                className="form-control floating w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                defaultValue={appointment?.patient?.id}
              />
            </div>
            <div className="input-block">
              <label className="focus-label text-sm font-medium text-gray-600">Subject</label>
              <input
                type="text"
                className="form-control floating w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                defaultValue="Computer Science"
              />
            </div>
            <div className="input-block">
              <label className="focus-label text-sm font-medium text-gray-600">Starting Date</label>
              <div className="cal-icon relative">
                <input
                  type="text"
                  className="form-control floating w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                  defaultValue="01/06/2002"
                />
                <i className="absolute top-3 right-3 text-gray-400 fa fa-calendar"></i>
              </div>
            </div>
            <div className="input-block">
              <label className="focus-label text-sm font-medium text-gray-600">Complete Date</label>
              <div className="cal-icon relative">
                <input
                  type="text"
                  className="form-control floating w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                  defaultValue="31/05/2006"
                />
                <i className="absolute top-3 right-3 text-gray-400 fa fa-calendar"></i>
              </div>
            </div>
            <div className="input-block">
              <label className="focus-label text-sm font-medium text-gray-600">Thời gian hẹn khám</label>
              <input
                type="text"
                className="form-control floating w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                defaultValue={convertTime(appointment?.appointment_date || 'Chưa chọn giờ')}
              />
            </div>
            <div className="input-block">
              <label className="focus-label text-sm font-medium text-gray-600">Grade</label>
              <input
                type="text"
                className="form-control floating w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                defaultValue="Grade A"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button onClick={close} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
            Đóng
          </button>
        </div>
      </div>
    </Dialog>
  );
}
export default ListAppointment;
