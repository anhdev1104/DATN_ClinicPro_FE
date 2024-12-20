/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { VisibilityIcon, DeleteIcon, SettingsIcon } from '@/components/icons';
import LoadingSpin from '@/components/loading';
import DirectRoute from '@/components/direct';
import { getAppointments, deleteAppointment } from '@/services/appointments.service';
import convertTime from '@/helpers/convertTime';
import { toast } from 'react-toastify';
import { ModalConfirm } from '@/components/modal';
import { SortOrderToggle } from '@/components/modal';
import convertStatusAppointments from '@/helpers/convertStatusAppointments';
const ListAppointment = () => {
  const [appointments, setAppointments] = useState<IListAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchAppointment, setSearchAppointment] = useState('');
  const [activeModal, setActiveModal] = useState(false);
  const [idAppointment, setIdAppointment] = useState<string | null | undefined>('');
  const handleCloseModal = () => {
    setActiveModal(!activeModal);
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(id);
      setAppointments(prev => prev.filter(pkg => pkg.id !== id));
      handleCloseModal();
      toast.success('Xóa lịch hẹn thành công!');
    } catch (err) {
      console.log(err);
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAppointment(e.target.value.toLowerCase());
  };
  const handleSortByTime = (sortOrder: 'asc' | 'desc') => {
    const sortedAppointments = [...appointments].sort((a, b) => {
      const timeA = new Date(a.created_at).getTime();
      const timeB = new Date(b.created_at).getTime();
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    });
    setAppointments(sortedAppointments);
  };
  const filteredAppointments = appointments.filter(pkg => {
    return (
      pkg?.patient?.id?.toString().includes(searchAppointment) ||
      pkg?.specialty?.description?.toLowerCase().includes(searchAppointment) ||
      pkg?.user?.user_info?.fullname?.toLowerCase().includes(searchAppointment) ||
      pkg?.package?.name?.toLowerCase().includes(searchAppointment)
    );
  });
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAppointments();
        console.log(response);

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
    <section className="package ">
      <DirectRoute nav="Quản lý lịch hẹn" subnav="Danh sách lịch hẹn" />
      <div className="bg-white rounded-2xl">
        <div className="doctor-table-blk mb-2 pt-5 px-4 flex items-center flex-wrap gap-7">
          <h1 className="text-lg font-semibold mb-0">Danh sách lịch hẹn</h1>
          <div className="flex items-center flex-wrap gap-7">
            <div className="top-nav-search table-search-blk">
              <SearchAdmin onSearch={handleSearchChange} />
            </div>
          </div>
        </div>
        <div className="list-package p-4 ">
          {loading ? (
            <div className="mx-auto text-center pt-10">
              <LoadingSpin className="!w-10 !h-10" color="border-primaryAdmin" />
            </div>
          ) : (
            <div className="overflow-x-auto whitespace-nowrap container-page scroll-select">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="border-b-2 border-primaryAdmin/20 bg-primaryAdmin/5 h-full">
                    <th className="p-4 text-center font-medium">ID Bệnh nhân</th>
                    <th className="p-4 text-center font-medium">Chuyên khoa</th>
                    <th className="p-4 text-center font-medium">Gói khám</th>
                    <th className="p-4 text-center font-medium">Bác sĩ</th>
                    <th className="p-4 text-center font-medium">Thời gian hẹn khám</th>
                    <th className="p-4 text-center font-medium">Hình thức đặt hẹn</th>
                    <th className="p-4 text-center font-medium">Trạng thái</th>
                    <th className="p-4 text-center font-medium flex gap-1">
                      <span>Thời gian đặt lịch</span>
                      <SortOrderToggle onSort={handleSortByTime} />
                    </th>
                    <th className="p-4 text-center font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((pkg, index) => (
                    <tr key={index} className=" even:bg-[#f5f5f5] hover:bg-yellow-50/45">
                      <td className="py-2 px-5 text-gray-800 max-w-[200px] truncate ">{pkg?.patient?.id}</td>
                      <td className="p-4 text-center text-gray-600">{pkg?.specialty?.description}</td>
                      <td className="p-4 text-center text-gray-600">{pkg?.package?.name}</td>
                      <td className="p-4 text-center text-blue-600">{pkg?.user?.user_info?.fullname || 'Chưa có'}</td>
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
                        {convertStatusAppointments(pkg.status)}
                      </td>
                      <td className="p-4 text-center text-gray-600">{convertTime(pkg.created_at)}</td>
                      <td className="py-2 px-5 text-gray-800 justify-center flex gap-1 max-w-[150px]">
                        <Link
                          to={`/appointments/send/${pkg.id}`}
                          className="flex justify-center w-[15%] rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-indigo-500"
                        >
                          <VisibilityIcon className="text-blue-500" />
                        </Link>
                        <Link
                          to={`/appointments/${pkg.id}`}
                          className="flex justify-center w-[15%] rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-indigo-500"
                        >
                          <SettingsIcon className="text-yellow-400" />
                        </Link>
                        <button
                          onClick={() => {
                            setActiveModal(true);
                            setIdAppointment(pkg.id);
                          }}
                          className="text-red-500 flex justify-center w-[15%] rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-indigo-500"
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <ModalConfirm
          description="Dữ liệu sẽ không thể khôi phục"
          title="Bạn có chắc muốn xóa ?"
          isClose={handleCloseModal}
          isOpen={activeModal}
          submit={() => handleDelete(idAppointment)}
          isLoading={loading}
          className="bg-red-500 hover:bg-red-600 text-white"
        />
      </div>
    </section>
  );
};

function SearchAdmin({ onSearch }: { onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch(e);
  };

  return (
    <form className="w-[300px]">
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        className="w-full  h-10 pl-10 border rounded-md py-2 text-gray-800 focus:outline-none  bg-[#f3f4f7]"
        placeholder="Tìm kiếm thông tin ..."
      />
    </form>
  );
}
export default ListAppointment;
