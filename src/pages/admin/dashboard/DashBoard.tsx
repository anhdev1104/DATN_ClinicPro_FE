import DirectRoute from '@/components/direct';
import { StatisticPatient } from './StatisticPatient';
import { StatisticAppointment } from './StatisticAppointment';
import { Stack } from '@mantine/core';
const Dashboard = () => {
  return (
    <div>
      <DirectRoute nav="Dashboard" subnav="Trang quản trị Admin" />
      <div className="bg-white rounded-3xl w-full shadow-xl p-4">
        <Stack>
          <StatisticPatient />
          <StatisticAppointment />
        </Stack>
      </div>
    </div>
  );
};

export default Dashboard;
