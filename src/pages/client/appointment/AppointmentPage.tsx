/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getPatientById } from '@/services/patient.service';
import { getAppointmentByPatient } from '@/services/appointments.service';
import convertTime from '@/helpers/convertTime';
import convertStatusAppointments from '@/helpers/convertStatusAppointments';
const AppointmentPage = () => {
  const auth = useSelector((state: RootState) => state.auth.data) as IUser;
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patient, setPatient] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await getAppointmentByPatient(auth.data.user_info.patient_id as string);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (auth.data.user_info.patient_id) {
      fetchAppointments();
    }
  }, [auth.data.user_info.patient_id]);
  useEffect(() => {
    const fetchPatient = async () => {
      if (!appointments[0]?.patient?.id) return;
      try {
        const response = await getPatientById(appointments[0].patient.id);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatient();
  }, [appointments]);

  return (
    <section className="package">
      <div className="bg-white rounded-2xl py-[3rem] container-page">
        <div className="mb-20 flex flex-col gap-2">
          <div className="font-bold text-[30px] text-primary">Xin chào, {auth.data.user_info.fullname} ...</div>
        </div>
        <div className="list-package p-4">
          {loading ? (
            <div className="mx-auto text-center pt-10">
              <span>Loading...</span>
            </div>
          ) : (
            // <div className="overflow-x-auto whitespace-nowrap">
            <table className="min-w-full table-auto border-collapse  whitespace-nowrap">
              <thead>
                <tr className="border-b-2 border-primaryAdmin/20 bg-primaryAdmin/5 h-full">
                  <th className="p-4 text-center font-medium">ID Bệnh nhân</th>
                  <th className="p-4 text-center font-medium">Chuyên khoa</th>
                  <th className="p-4 text-center font-medium">Gói khám</th>
                  <th className="p-4 text-center font-medium">Bác sĩ</th>
                  <th className="p-4 text-center font-medium">Thời gian hẹn khám</th>
                  <th className="p-4 text-center font-medium">Trạng thái</th>
                  <th className="p-4 text-center font-medium">Thời gian đặt lịch</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment, index) => (
                    <tr key={index} className="even:bg-[#f5f5f5] hover:bg-yellow-50/45">
                      <td className="py-2 px-5 text-gray-800 max-w-[200px] truncate">
                        {appointment.patient?.id || 'N/A'}
                      </td>
                      <td className="p-4 text-center text-gray-600">{appointment.specialty?.name || 'N/A'}</td>
                      <td className="p-4 text-center text-gray-600">{appointment.package?.name || 'N/A'}</td>
                      <td className="p-4 text-center text-blue-600">
                        {appointment.user?.user_info?.fullname || 'Chưa có'}
                      </td>
                      <td className="p-4 text-center text-gray-600">{convertTime(appointment.appointment_date)}</td>
                      <td
                        className={`p-4 text-center ${
                          appointment.status === 'pending'
                            ? 'text-yellow-500'
                            : appointment.status === 'confirmed'
                              ? 'text-green-500'
                              : 'text-red-500'
                        }`}
                      >
                        {convertStatusAppointments(appointment.status)}
                      </td>
                      <td className="p-4 text-center text-gray-600">{convertTime(appointment.created_at)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center text-gray-500">
                      Không có lịch hẹn nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default AppointmentPage;
