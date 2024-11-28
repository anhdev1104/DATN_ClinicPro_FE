import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '@/components/input';
import { MoreVertIcon, AddIcon } from '@/components/icons';
import { IListAppointment } from '@/types/appointment.type';
import DirectRoute from '@/components/direct';
import { getAppointments } from '@/services/appointments.service';
import { Dialog } from '@mui/material';
import convertTime from '@/helpers/convertTime';
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
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentResponse = await getAppointments();
        setAppointments(appointmentResponse.data || []);
      } catch (error) {
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
                    <td className="p-4 text-center text-gray-800 w-[15%] ">{pkg.patient_id}</td>
                    <td className="p-4 text-center text-gray-600 w-[15%]">{pkg.package_id}</td>
                    <td className="p-4 text-center  text-gray-600 w-[15%]">{pkg.specialty_id}</td>
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
                              to={`/edit-package/${pkg.id}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleToggle(pkg.id)}
                            >
                              Sửa
                            </Link>
                            <Link
                              to="#"
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              // onClick={() => handleDelete(pkg.id)}
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
          backgroundColor: '#f5f5f5',
          width: '700px',
          height: 'auto',
          maxWidth: '700px',
          borderRadius: '8px',
          overflowY: 'hidden',
        },
      }}
    >
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Chi tiết lịch hẹn </h2>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <div className="flex">
            <span className="font-semibold text-gray-600 w-1/3">ID:</span>
            <span className="text-gray-800">{appointment?.id || 'Không có'}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-gray-600 w-1/3">Tên:</span>
            <span className="text-gray-800">{appointment?.patient_id || 'Không có'}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-gray-600 w-1/3">Mô tả:</span>
            <span className="text-gray-800">{appointment?.specialty_id || 'Không có'}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-gray-600 w-1/3">Số lượng bác sĩ:</span>
            <span className="text-gray-800">{appointment?.booking_type || '0'}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-gray-600 w-1/3">Ngày tạo:</span>
            <span className="text-gray-800">{convertTime(appointment?.appointment_date || 'Không có')}</span>
          </div>
        </div>

        {/* Buttons */}
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
