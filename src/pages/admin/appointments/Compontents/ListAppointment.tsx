/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddIcon, DeleteIcon, SettingsIcon } from '@/components/icons';
import DirectRoute from '@/components/direct';
import { getAppointments, deleteAppointment } from '@/services/appointments.service';
import convertTime from '@/helpers/convertTime';
import { toast } from 'react-toastify';
const ListAppointment = () => {
  const [appointments, setAppointments] = useState<IListAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchAppointment, setSearchAppointment] = useState('');

  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(id);
      setAppointments(prev => prev.filter(pkg => pkg.id !== id));
      toast.success('Xóa lịch hẹn thành công!');
    } catch (err) {
      toast.error('Có lỗi xảy ra khi xóa lịch hẹn.');
      console.log(err);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAppointment(e.target.value.toLowerCase());
  };
  const filteredAppointments = appointments.filter(pkg => {
    return (
      pkg?.patient?.id?.toString().includes(searchAppointment) ||
      pkg?.specialty?.name?.toLowerCase().includes(searchAppointment) ||
      pkg?.package?.name?.toLowerCase().includes(searchAppointment)
    );
  });
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAppointments();
        setAppointments(response.data || []);
      } catch (error) {
        console.error(error);
        setError('Không thể tải danh sách lịch hẹn. Vui lòng thử lại sau.');
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
              <SearchAdmin onSearch={handleSearchChange} />
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
                  <th className="p-4 text-center font-medium">ID Bệnh nhân</th>
                  <th className="p-4 text-center font-medium">Chuyên khoa</th>
                  <th className="p-4 text-center font-medium">Gói khám</th>
                  <th className="p-4 text-center font-medium">Thời gian hẹn khám</th>
                  <th className="p-4 text-center font-medium">Hình thức đặt hẹn</th>
                  <th className="p-4 text-center font-medium">Trạng thái</th>
                  <th className="p-4 text-center font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((pkg, index) => (
                  <tr key={index} className="odd">
                    <td className="p-2 text-center text-gray-800">{pkg?.patient?.id}</td>
                    <td className="p-4 text-center text-gray-600">{pkg?.specialty?.name}</td>
                    <td className="p-4 text-center text-gray-600">{pkg?.package?.name}</td>
                    <td className="p-4 text-center text-gray-600">{convertTime(pkg.appointment_date)}</td>
                    <td className="p-4 text-center text-gray-800">{pkg.booking_type}</td>
                    <td
                      className={`p-4 text-center ${
                        pkg.status === 'pending'
                          ? 'text-yellow-500'
                          : pkg.status === 'confirmed'
                            ? 'text-green-500'
                            : 'text-red-500'
                      }`}
                    >
                      {pkg.status}
                    </td>
                    <td className="p-4 flex justify-center gap-2">
                      <Link
                        to={`/appointments/${pkg.id}`}
                        className="rounded-md border border-gray-300 px-3 py-1 bg-white hover:bg-gray-50"
                      >
                        <SettingsIcon className="text-yellow-400" />
                      </Link>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="rounded-md border border-gray-300 px-3 py-1 bg-white text-red-500 hover:bg-gray-50"
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

function SearchAdmin({ onSearch }: { onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value); // Cập nhật state
    onSearch(e); // Gọi callback truyền từ parent
  };

  return (
    <form className="w-[300px]">
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        className="w-full  h-12 pl-10 border rounded-md py-2 text-gray-800 focus:outline-none  bg-[#f3f4f7]"
        placeholder="Tìm kiếm thông tin ..."
      />
    </form>
  );
}

export default ListAppointment;
