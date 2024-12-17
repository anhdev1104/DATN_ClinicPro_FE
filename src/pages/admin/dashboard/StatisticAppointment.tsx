import BaseIcon from '@/components/base/BaseIcon';
import {
  useGetStatisticAppointmentsByMonthQuery,
  useGetStatisticAppointmentsByStatusQuery,
  useGetStatisticAppointmentsQuery,
} from '@/redux/api/statistics';
import { Card, Group, SimpleGrid, Space, Stack, Text } from '@mantine/core';
import { IconCalendar, IconCalendarMonth, IconCalendarWeek, IconLayoutList } from '@tabler/icons-react';
import { BarChart } from '@mantine/charts';
import { convertToMonth } from '@/helpers/utils';
export const StatisticAppointment = () => {
  const { data: appointmentMonth } = useGetStatisticAppointmentsByMonthQuery();
  const { data: status } = useGetStatisticAppointmentsByStatusQuery();
  const { data: appointment } = useGetStatisticAppointmentsQuery();
  return (
    <>
      <Stack>
        <Text>Thống Kê Lịch Hẹn Năm {new Date().getFullYear()}</Text>
        <SimpleGrid cols={4}>
          <ListAppointment title="Hôm Nay" value={appointment?.day} icon={IconLayoutList} />
          <ListAppointment title="Tuần Này" value={appointment?.week} icon={IconCalendarWeek} />
          <ListAppointment title="Tháng Này" value={appointment?.month} icon={IconCalendarMonth} />
          <ListAppointment title="Năm Này" value={appointment?.year} icon={IconCalendar} />
        </SimpleGrid>
        <Card withBorder>
          <Group justify="space-between" mb="md">
            <Text>Trạng Thái Lịch Hẹn</Text>
          </Group>
          <BarChart
            data={convertToMonth(status || [])}
            dataKey="status"
            series={[{ name: 'total', color: 'violet' }]}
            tooltipAnimationDuration={400}
            withBarValueLabel
            withYAxis={false}
            h={300}
          />
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Text>Lịch Hẹn Hàng Tháng</Text>
          </Group>
          <BarChart
            data={convertToMonth(appointmentMonth || [])}
            dataKey="month"
            series={[{ name: 'total', color: 'violet' }]}
            tooltipAnimationDuration={400}
            withBarValueLabel
            withYAxis={false}
            h={300}
          />
        </Card>
      </Stack>
    </>
  );
};
const ListAppointment = ({ title, icon, value }: { title: string; icon: any; value?: number }) => {
  return (
    <Card withBorder shadow="sm" radius="md">
      <Space>
        <Group>
          <BaseIcon icon={icon} />
          <Text size="sm">{title}</Text>
        </Group>
        <Text>{value}</Text>
      </Space>
    </Card>
  );
};
