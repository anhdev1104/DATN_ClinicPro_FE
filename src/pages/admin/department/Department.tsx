import { Avatar, Pagination, Text } from '@mantine/core';
import { useGetDepartmentsQuery } from '@/redux/api/department';
import { useNavigate } from 'react-router-dom';
import type { DepartmentProps, ManagerProps } from '@/types/department.type';
import BaseButton from '@/components/base/button';
import BaseIcon from '@/components/base/BaseIcon';
import { useDebouncedCallback } from '@mantine/hooks';
import NewDepartment from './components/CreateDepartment';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import BaseInput from '@/components/base/input';
import { UserInfo } from '@/components/user-info/UserInfo';
import dayjs from 'dayjs';
import { modals } from '@mantine/modals';
import { useColumn } from '@/hooks/useColumn';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';
import { Table, ActionWithRow } from '@/lib/table';

export default function Department() {
  const navigate = useNavigate();
  const [limit] = useState(5);
  const [query, setQuery] = useQueryParams({
    limit: withDefault(NumberParam, limit),
    q: withDefault(StringParam, ''),
    page: withDefault(NumberParam, 1),
  });
  const { data: departments, isFetching } = useGetDepartmentsQuery(query as QueryParams);

  const columns = useColumn<DepartmentProps>([
    {
      key: 'name',
      header: 'Tên Phòng Ban',
      cell: ({ value }) => <div className="capitalize">{value}</div>,
      meta: {
        label: 'Tên Phòng Ban',
      },
    },
    {
      key: 'manager',
      header: 'Quản Lý',
      cell: ({ value }: { value: ManagerProps }) => {
        return <UserInfo avatar={value?.avatar} email={value?.email} fullname={value?.fullname} />;
      },
      meta: {
        label: 'Quản Lý',
      },
      sortable: false,
    },
    {
      key: 'users_count',
      header: 'Nhân viên',
      cell: ({ value, row }) => (
        <>
          <Avatar.Group>
            {row.original.users?.slice(0, 3).map(user => <Avatar key={user.id} src={user.avatar} />)}
            <Avatar>{value}</Avatar>
          </Avatar.Group>
        </>
      ),
      meta: {
        label: 'Nhân viên',
      },
      sortable: false,
    },
    {
      key: 'created_at',
      header: 'Ngày tạo',
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
      meta: {
        label: 'Ngày tạo',
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <ActionWithRow
          data={[
            {
              label: 'Xem chi tiết',
              onClick: () => navigate(`/departments/${row.original.id}`),
            },
          ]}
          row={row}
        />
      ),
    },
  ]);
  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl p-4">
        <Table
          highlightOnHover
          filterItem={
            <BaseInput
              defaultValue={query.q}
              onChange={useDebouncedCallback(e => setQuery({ q: e.target.value, page: 1 }), 500)}
              size="xs"
              radius="md"
              placeholder="tìm kiếm..."
            />
          }
          pagination={
            <Pagination
              total={departments?.total_pages || 1}
              onChange={page => setQuery({ page })}
              value={query.page || 1}
              radius="md"
              className="w-full flex justify-center py-2"
            />
          }
          onRowClick={row => navigate(`/departments/${row.original.id}`)}
          isFetching={isFetching}
          data={departments?.data || []}
          columns={columns}
          toolbar={
            <BaseButton.Icon
              onClick={() => {
                modals.open({
                  title: 'Tạo Mới Phòng Ban',
                  children: <NewDepartment handleClose={modals.closeAll} />,
                });
              }}
              variant="subtle"
              radius="lg"
            >
              <BaseIcon icon={IconPlus} size="md" />
            </BaseButton.Icon>
          }
        />
      </div>
    </>
  );
}
