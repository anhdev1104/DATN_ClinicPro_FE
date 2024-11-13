import { useDeleteAnDepartmentMutation, useGetDepartmentDetailQuery } from '@/redux/api/department';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Box, Paper, Stack, Title } from '@mantine/core';
import { Avatar, Text, Group } from '@mantine/core';
import BaseIcon from '@/components/base/BaseIcon';
import yup from '@/helpers/locate';
import DataTable from '@/components/table/Table';
import { userDepartmentSchema } from '@/schema/department.schema';
import ActionWithRow from '@/components/table/TableAction';
import { useMemo } from 'react';
import BaseButton from '@/components/base/button';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { toast } from 'react-toastify';
import NotFoundPage from '@/pages/client/404/NotFoundPage';
import fakeUser from './components/fakeUser.json';
import { IconArrowLeft, IconAt, IconPhoneCall } from '@tabler/icons-react';
import { useColumn } from '@/hooks/useColumn';
type UserDepartment = yup.InferType<typeof userDepartmentSchema>;
const DepartmentDetail = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isSuccess, isFetching, isError } = useGetDepartmentDetailQuery(id as string);
  const manager = useMemo(() => data?.data.manager, [data]);
  const [handleDelete, { isLoading }] = useDeleteAnDepartmentMutation();
  const columns = useColumn<UserDepartment>([
    {
      key: 'fullname',
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
      key: 'phone_number',
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
                <BaseIcon icon={IconArrowLeft} size="xl" />
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
                      <BaseIcon icon={IconAt} strokeWidth={1.5} className="" />
                      <Text fz="xs" c="dimmed">
                        {manager?.email}
                      </Text>
                    </Group>

                    <Group wrap="nowrap" gap={10} mt={5}>
                      <BaseIcon icon={IconPhoneCall} strokeWidth={1.5} className="" />
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
              <DataTable
                columns={columns}
                data={/*isSuccess ? data.data?.users : []*/ fakeUser as UserDepartment[]}
                isFetching={isFetching}
              />
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
        <NotFoundPage title="không có phòng ban hiển thị" />
      )}
    </Paper>
  );
};
export default DepartmentDetail;
