import { useDeleteAnDepartmentMutation, useGetDepartmentDetailQuery } from '@/redux/api/department';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Box, Paper, Stack, Title } from '@mantine/core';
import { Avatar, Text, Group } from '@mantine/core';
import BaseIcon from '@/components/base/BaseIcon';
import yup from '@/utils/locate';
import DataTable from '@/components/table/Table';
import { ColumnDef } from '@tanstack/react-table';
import HeaderTable from '@/components/table/HeaderTable';
import { userDepartmentSchema } from '@/schema/department.schema';
import BaseInput from '@/components/base/input';
import { IMaskInput } from 'react-imask';
import ActionWithRow from '@/components/table/ActionWithRow';
import { useMemo } from 'react';
import BaseButton from '@/components/base/button';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { toast } from 'react-toastify';
import NotFound from '@/pages/404';
type UserDepartment = yup.InferType<typeof userDepartmentSchema>;
const columns: ColumnDef<UserDepartment>[] = [
  {
    accessorKey: 'fullname',
    header: ({ column }) => <HeaderTable title="Nhân Viên" column={column} />,
    cell: ({ row }) => (
      <Group gap="sm">
        <Avatar size={40} src={row.getValue('avatar') as string} radius={40} />
        <div>
          <Text fz="sm" fw={500}>
            {row.getValue('fullname') as string}
          </Text>
        </div>
      </Group>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <HeaderTable title="Email" column={column} />,
    cell: ({ row }) => (
      <Text fz="xs" c="dimmed">
        {row.getValue('email') as string}
      </Text>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <HeaderTable title="Trạng Thái" column={column} />,
    cell: ({ row }) => <Badge>{row.getValue('status')}</Badge>,
  },
  {
    accessorKey: 'phone_number',
    header: ({ column }) => <HeaderTable title="Trạng Thái" column={column} />,
    cell: ({ row }) => (
      <BaseInput
        value={row.getValue('phone_number') as string}
        component={IMaskInput}
        mask="+84 (000) 000-00-00"
        name="phone"
        placeholder="Your phone"
      />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <ActionWithRow row={row} />;
    },
  },
];
const DepartmentDetail = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isSuccess, isFetching, isError } = useGetDepartmentDetailQuery(id as string);
  const manager = useMemo(() => data?.data.manager, [data]);
  const [handleDelete, { isLoading }] = useDeleteAnDepartmentMutation();
  const handleDeleteDepartment = () => {
    if (isSuccess) {
      handleDelete(data?.data.id);
      navigate('/departments');
    } else {
      toast.error('phòng ban không tồn tại');
    }
  };
  return (
    <Paper className="p-2 rounded-3xl">
      {!isError ? (
        <>
          <Box component="div" className="text-center space-y-4">
            <div className="relative flex justify-center items-center">
              <BaseButton.Icon
                onClick={() => navigate(-1)}
                variant="subtle"
                c="dimmed"
                radius="lg"
                className="absolute left-0"
              >
                <BaseIcon name="arrow-left" size="xl" />
              </BaseButton.Icon>
              <Title order={2} className="mt-0">
                {data?.data.name}
              </Title>
            </div>
            <Text fz="xs" c="dimmed" fw={500} className="text-left">
              {data?.data.description}
            </Text>
          </Box>
          <div className="flex flex-col space-y-10">
            <div className="space-y-2">
              <Title order={4}>Quản Lý</Title>
              {manager ? (
                <Group wrap="nowrap">
                  <Avatar src={manager?.avatar} size={94} radius="md" />
                  <div>
                    <Text fz="lg" fw={500}>
                      {manager?.fullname}
                    </Text>
                    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                      {manager?.address}
                    </Text>

                    <Group wrap="nowrap" gap={10} mt={3}>
                      <BaseIcon name="at-sign" strokeWidth={1.5} className="" />
                      <Text fz="xs" c="dimmed">
                        {manager?.email}
                      </Text>
                    </Group>

                    <Group wrap="nowrap" gap={10} mt={5}>
                      <BaseIcon name="phone-call" strokeWidth={1.5} className="" />
                      <Text fz="xs" c="dimmed">
                        {manager?.phone_number}
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
              <DataTable columns={columns} data={isSuccess ? data.data?.users : []} loading={isFetching} />
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
        </>
      ) : (
        <NotFound title="không có phòng ban hiển thị" />
      )}
    </Paper>
  );
};
export default DepartmentDetail;
