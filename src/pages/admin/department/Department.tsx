import { Avatar, Modal, Pagination, Text } from '@mantine/core';
import { useGetDepartmentsQuery } from '@/redux/api/department';
import { useNavigate } from 'react-router-dom';
import type { DepartmentProps, ManagerProps } from '@/types/department.type';
import Table from '@/components/table/Table';
import ActionWithRow from '@/components/table/TableAction';
import BaseButton from '@/components/base/button';
import BaseIcon from '@/components/base/BaseIcon';
import { useDebouncedCallback, useDisclosure } from '@mantine/hooks';
import NewDepartment from './components/CreateDepartment';
import { IconPlus } from '@tabler/icons-react';
import { useColumn } from '@/hooks/useColumn';
import { useState } from 'react';
import BaseInput from '@/components/base/input';
import { useQueryParams } from '@/hooks/useQueryParams';
import { UserInfo } from '@/components/user-info/UserInfo';
import dayjs from 'dayjs';

export default function Department() {
  const [params, queryParams] = useQueryParams();
  const debounced = useDebouncedCallback(value => {
    queryParams.set('q', value);
  }, 1000);
  const [modalNew, handleModalNew] = useDisclosure(false);
  const [limit] = useState(5);
  const {
    data: departments,
    isSuccess,
    isFetching,
  } = useGetDepartmentsQuery({
    q: params.q || '',
    limit: params.limit || limit,
    page: params.page,
  });
  const navigate = useNavigate();
  const handleRowClick = (data: DepartmentProps) => {
    navigate(data.id);
  };
  const columns = useColumn<DepartmentProps>([
    {
      key: 'name',
      label: 'Tên Phòng Ban',
      cell: ({ value }) => <div className="capitalize">{value}</div>,
    },
    {
      key: 'manager',
      label: 'Quản Lý',
      cell: ({ value }: { value: ManagerProps }) => {
        return <UserInfo avatar={value?.avatar} email={value?.email} fullname={value?.fullname} />;
      },
      sortable: false,
    },
    {
      key: 'users_count',
      label: 'Nhân viên',
      cell: ({ value, original }) => (
        <>
          <Avatar.Group>
            {original.users.slice(0, 3).map(user => (
              <Avatar key={user.id} src={user.avatar} />
            ))}
            <Avatar>{value}</Avatar>
          </Avatar.Group>
        </>
      ),
      sortable: false,
    },
    {
      key: 'created_at',
      label: 'Ngày tạo',
      cell: ({ value }) => {
        const date = dayjs(value).format('DD-MM-YYYY');
        return (
          <>
            <Text size="sm" fw={400} c="dimmed">
              {date}
            </Text>
          </>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row, original }) => (
        <ActionWithRow
          data={[
            {
              label: 'Xem chi tiết',
              onClick: () => navigate(original.id),
            },
          ]}
          row={row as any}
        />
      ),
      placeholder: true,
    },
  ]);
  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl p-4">
        <Table
          className="ml-2"
          highlightOnHover
          manualFiltering
          filterItem={
            <BaseInput onChange={e => debounced(e.target.value)} size="xs" radius="md" placeholder="tìm kiếm..." />
          }
          manualPagination
          pagination={
            Math.round((departments?.total || limit) / limit) > 1 && (
              <Pagination
                total={Math.round((departments?.total || limit) / limit)}
                onChange={value => queryParams.set('page', value.toString())}
                radius="md"
                defaultValue={Number(params.page) || 1}
                className="w-full flex justify-center py-2"
              />
            )
          }
          onRowClick={handleRowClick}
          isFetching={isFetching}
          data={isSuccess ? departments.data : []}
          columns={columns}
          toolbar={
            <BaseButton.Icon onClick={handleModalNew.open} variant="subtle" radius="lg">
              <BaseIcon icon={IconPlus} size="md" />
            </BaseButton.Icon>
          }
        />
        <Modal
          radius="md"
          size="xl"
          centered
          opened={modalNew}
          onClose={handleModalNew.close}
          title="Tạo Mới Phòng Ban"
        >
          <NewDepartment handleClose={handleModalNew.close} />
        </Modal>
      </div>
    </>
  );
}
