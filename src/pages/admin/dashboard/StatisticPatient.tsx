import { Card, Flex, Group, SimpleGrid, Space, Stack, Text } from '@mantine/core';
import { useGetStatisticPatientQuery } from '@/redux/api/statistics';
import {
  IconArrowsDownUp,
  IconCalendar,
  IconCalendarMonth,
  IconCalendarStats,
  IconCalendarWeek,
  IconLayoutList,
} from '@tabler/icons-react';
import { YearPickerInput } from '@mantine/dates';
import { DateParam, useQueryParam, withDefault } from 'use-query-params';
import BaseIcon from '@/components/base/BaseIcon';
export const StatisticPatient = () => {
  const [year, setYear] = useQueryParam('year', withDefault(DateParam, new Date()));
  const { data: patient } = useGetStatisticPatientQuery({ year: year.getFullYear() });
  return (
    <>
      <Stack>
        <Flex justify="space-between" align="center">
          <Text>Thống Kê Bệnh Nhân</Text>
          <YearPickerInput
            defaultValue={year}
            onChange={value => setYear(value)}
            rightSection={<BaseIcon icon={IconArrowsDownUp} />}
          />
        </Flex>
        <SimpleGrid cols={5}>
          <ListPatient title="Ngày" value={patient?.day} icon={IconLayoutList} />
          <ListPatient title="Tuần" value={patient?.week} icon={IconCalendarWeek} />
          <ListPatient title="Tháng" value={patient?.month} icon={IconCalendarMonth} />
          <ListPatient title="Năm" value={patient?.year} icon={IconCalendar} />
          <ListPatient title="Tổng Cộng" value={patient?.total} icon={IconCalendarStats} />
        </SimpleGrid>
      </Stack>
    </>
  );
};
const ListPatient = ({ title, icon, value }: { title: string; icon: any; value?: number }) => {
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
