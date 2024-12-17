import BaseIcon from '@/components/base/BaseIcon';
import {
  useGetStatisticAppointmentsByMonthQuery,
  useGetStatisticAppointmentsByStatusQuery,
  useGetStatisticAppointmentsQuery,
} from '@/redux/api/statistics';
import { Card, Flex, Group, SimpleGrid, Space, Stack, Text } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import {
  IconArrowsDownUp,
  IconCalendar,
  IconCalendarMonth,
  IconCalendarStats,
  IconCalendarWeek,
  IconLayoutList,
} from '@tabler/icons-react';
import { DateParam, useQueryParam, withDefault } from 'use-query-params';
import { BarChart } from '@mantine/charts';
import { convertToMonth } from '@/helpers/utils';
export const StatisticAppointment = () => {
  const [year, setYear] = useQueryParam('year', withDefault(DateParam, new Date()));
  const { data: appointmentMonth } = useGetStatisticAppointmentsByMonthQuery();
  const { data: status } = useGetStatisticAppointmentsByStatusQuery();
  const { data: appointment } = useGetStatisticAppointmentsQuery();
  return (
    <>
      <Stack>
        <Flex justify="space-between" align="center">
          <Text>Thống Kê Lịch Hẹn</Text>
          <YearPickerInput
            defaultValue={year}
            onChange={value => setYear(value)}
            rightSection={<BaseIcon icon={IconArrowsDownUp} />}
          />
        </Flex>
        <SimpleGrid cols={5}>
          <ListAppointment title="Ngày" value={appointment?.day} icon={IconLayoutList} />
          <ListAppointment title="Tuần" value={appointment?.week} icon={IconCalendarWeek} />
          <ListAppointment title="Tháng" value={appointment?.month} icon={IconCalendarMonth} />
          <ListAppointment title="Năm" value={appointment?.year} icon={IconCalendar} />
          <ListAppointment title="Tổng Cộng" value={appointment?.total} icon={IconCalendarStats} />
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
