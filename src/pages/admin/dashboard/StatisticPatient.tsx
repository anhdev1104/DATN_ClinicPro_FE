import { Card, Group, SimpleGrid, Space, Stack, Text } from '@mantine/core';
import { useGetStatisticPatientQuery } from '@/redux/api/statistics';
import { IconCalendar, IconCalendarMonth, IconCalendarWeek, IconLayoutList } from '@tabler/icons-react';
import BaseIcon from '@/components/base/BaseIcon';
export const StatisticPatient = () => {
  const { data: patient } = useGetStatisticPatientQuery();
  return (
    <>
      <Stack>
        <Text>Thống Kê Bệnh Nhân Năm {new Date().getFullYear()}</Text>
        <SimpleGrid cols={4}>
          <ListPatient title="Hôm Nay" value={patient?.day} icon={IconLayoutList} />
          <ListPatient title="Tuần này" value={patient?.week} icon={IconCalendarWeek} />
          <ListPatient title="Tháng này" value={patient?.month} icon={IconCalendarMonth} />
          <ListPatient title="Năm này" value={patient?.year} icon={IconCalendar} />
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
