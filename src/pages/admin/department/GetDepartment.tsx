import { useGetDepartmentQuery, useUpdateDepartmentMutation } from '@/redux/api/department';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Box, Paper, Title } from '@mantine/core';
import { Avatar, Text, Group } from '@mantine/core';
import BaseIcon from '@/components/base/BaseIcon';
import Table from '@/components/table/Table';
import ActionWithRow from '@/components/table/TableAction';
import BaseButton from '@/components/base/button';
import { useDisclosure } from '@mantine/hooks';
import { IconAt, IconPencil, IconPhoneCall, IconTrash } from '@tabler/icons-react';
import { useColumn } from '@/hooks/useColumn';
import { Link } from 'react-router-dom';
import { DeleteDepartment } from './components/DeleteDepartment';
import { UserProps } from '@/types/department.type';
import { Header } from './components/Header';
const GetDepartment = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { id } = useParams();
  const [handleUpdate] = useUpdateDepartmentMutation();
  const { data: department, isFetching } = useGetDepartmentQuery(id as string);
  const columns = useColumn<UserProps>([
    {
      key: 'user_info.fullname',
      label: 'Nhân Viên',
      cell: ({ value, original }) => {
        return (
          <Group gap="sm">
            <Avatar size={32} src={original.avatar} radius={40} />
            <div>
              <Text fz="sm" fw={500}>
                {value}
              </Text>
            </div>
          </Group>
        );
      },
      sortable: false,
    },
    {
      key: 'email',
      label: 'Email',
      cell: ({ value }) => (
        <Text fz="xs" c="dimmed">
          {value}
        </Text>
      ),
    },
    {
      key: 'status',
      label: 'Trạng Thái',
      cell: ({ value }) => <Badge size="xs">{value}</Badge>,
    },
    {
      key: 'user_info.phone_number',
      label: 'Số Điện Thoại',
    },
    {
      id: 'actions',
      cell: ({ row, original }) => {
        return (
          <ActionWithRow
            data={[
              {
                label: 'Xóa',
                onClick: () => handleUpdate({ id: original.id, users_delete: [original.id] }),
                color: 'red',
                leftSection: <BaseIcon icon={IconTrash} />,
              },
            ]}
            row={row as any}
          />
        );
      },
    },
  ]);
  return (
    <>
      <Paper className="p-2 rounded-3xl">
        <Header />
        <div className="flex flex-col space-y-10">
          <div className="space-y-2">
            <Title order={4}>Quản Lý</Title>
            {department?.manager ? (
              <Group wrap="nowrap">
                <Avatar src={department?.manager?.avatar} size={94} radius="md" />
                <div>
                  <Text fz="lg" fw={500}>
                    {department?.manager?.fullname}
                  </Text>
                  <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                    {department?.manager?.address}
                  </Text>

                  <Group wrap="nowrap" gap={10} mt={3}>
                    <BaseIcon icon={IconAt} strokeWidth={1.5} className="" />
                    <Text fz="xs" c="dimmed">
                      {department?.manager?.email}
                    </Text>
                  </Group>

                  <Group wrap="nowrap" gap={10} mt={5}>
                    <BaseIcon icon={IconPhoneCall} strokeWidth={1.5} className="" />
                    <Text fz="xs" c="dimmed">
                      {department?.manager?.phone_number}
                    </Text>
                  </Group>
                </div>
              </Group>
            ) : (
              <Title order={5} c="dimmed" fw={600}>
                Chưa có Người Quản Lý
              </Title>
            )}
          </div>
          <div className="space-y-2">
            <Title order={4} className="capitalize">
              Nhân viên phòng ban
            </Title>
            <Table columns={columns} data={department?.users || []} isFetching={isFetching} />
          </div>
          <div className="flex justify-end items-center space-x-4 my-4">
            <BaseButton size="xs" leftSection={<BaseIcon icon={IconTrash} />} onClick={open} color="red">
              Xóa Phòng Ban
            </BaseButton>
            <Link to="edit">
              <BaseButton size="xs" leftSection={<BaseIcon icon={IconPencil} />} color="blue">
                Cập Nhật
              </BaseButton>
            </Link>
          </div>
        </div>
      </Paper>
      <DeleteDepartment opened={opened} close={close} />
    </>
  );
};
export default GetDepartment;
