import { useDeleteDepartmentMutation, useGetDepartmentsQuery } from '@/redux/api/department';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Box, Paper, Stack, Title } from '@mantine/core';
import { Avatar, Text, Group } from '@mantine/core';
import BaseIcon from '@/components/base/BaseIcon';
import Table from '@/components/table/Table';
import ActionWithRow from '@/components/table/TableAction';
import BaseButton from '@/components/base/button';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowLeft, IconAt, IconPhoneCall } from '@tabler/icons-react';
import { useColumn } from '@/hooks/useColumn';
import { useGetUsersQuery } from '@/redux/api/users';
import { DepartmentProps } from '@/types/department.type';
import { IUserInfo } from '@/types/user.type';
const GetDepartment = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { department } = useGetDepartmentsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      department: (data?.data.find(data => data.id === id) || []) as DepartmentProps,
    }),
  });
  const { data: users, isFetching: isUserFetching } = useGetUsersQuery({ department: id });
  const [handleDelete, { isLoading }] = useDeleteDepartmentMutation();
  const columns = useColumn<IUserInfo>([
    {
      key: 'user_info.fullname',
      label: 'Nhân Viên',
      cell: ({ value, original }) => {
        return (
          <Group gap="sm">
            <Avatar size={32} src={original.user_info.avatar} radius={40} />
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
      cell: ({ row }) => {
        return <ActionWithRow row={row as any} />;
      },
    },
  ]);
  const handleDeleteDepartment = () => {
    handleDelete(department.id);
    navigate('/departments');
  };
  return (
    <Paper className="p-2 rounded-3xl">
      <Box component="div" className="text-center space-y-4">
        <div className="relative flex justify-center items-center">
          <BaseButton.Icon
            onClick={() => navigate(-1)}
            variant="subtle"
            c="dimmed"
            radius="lg"
            className="absolute left-0"
          >
            <BaseIcon icon={IconArrowLeft} size="xl" />
          </BaseButton.Icon>
          <Title order={2} className="mt-0">
            {department.name}
          </Title>
        </div>
        <Text fz="xs" c="dimmed" fw={500} className="text-left">
          {department.description}
        </Text>
      </Box>
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
          <Table columns={columns} data={users?.data || []} isFetching={isUserFetching} />
        </div>
        <div className="flex justify-between items-center">
          <BaseButton onClick={open} color="red" className="ml-auto my-4">
            Xóa Phòng Ban
          </BaseButton>
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Bạn có chắc muốn xóa phòng ban này" centered>
        <Stack gap={10}>
          <Text fz="sm" fw={500}>
            xóa phòng ban bạn không thể khôi phục được nữa
          </Text>
          <BaseButton
            onClick={handleDeleteDepartment}
            loading={isLoading}
            disabled={isLoading}
            color="red"
            className="flex ml-auto"
          >
            Xóa
          </BaseButton>
        </Stack>
      </Modal>
    </Paper>
  );
};
export default GetDepartment;
