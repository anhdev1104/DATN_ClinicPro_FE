import { Avatar, Text } from '@mantine/core';
import { useGetDepartmentsQuery } from '@/redux/api/department';
import { useNavigate } from 'react-router-dom';
import type { DepartmentProps, ManagerProps } from '@/types/department.type';
import BaseButton from '@/components/base/button';
import BaseIcon from '@/components/base/BaseIcon';
import NewDepartment from './components/CreateDepartment';
import { IconPlus } from '@tabler/icons-react';
import { UserInfo } from '@/components/user-info/UserInfo';
import dayjs from 'dayjs';
import { modals } from '@mantine/modals';
import { useColumn } from '@/hooks/useColumn';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';
import { ActionWithRow } from '@/components/common/table';
import { Table } from '@/components/common/table/primary';
import { ROW_PER_PAGE } from '@/constants/config';
import DirectRoute from '@/components/direct';

export default function Department() {
  const navigate = useNavigate();
  const [query, setQuery] = useQueryParams({
    limit: withDefault(NumberParam, ROW_PER_PAGE),
    q: withDefault(StringParam, ''),
    page: withDefault(NumberParam, 1),
  });
  const { data: departments, isFetching, isLoading } = useGetDepartmentsQuery(query as QueryParams);

  const columns = useColumn<DepartmentProps>([
    {
      accessorKey: 'name',
      header: 'Tên Phòng Ban',
      meta: {
        label: 'Tên Phòng Ban',
      },
    },
    {
      accessorKey: 'manager',
      header: 'Quản Lý',
      cell: ({ getValue }) => {
        const value = getValue() as ManagerProps;
        return <UserInfo avatar={value?.avatar} email={value?.email} fullname={value?.fullname} />;
      },
      meta: {
        label: 'Quản Lý',
      },
      enableSorting: false,
    },
    {
      accessorKey: 'users_count',
      header: 'Nhân viên',
      cell: ({ getValue, row }) => (
        <Avatar.Group>
          {row.original.users?.slice(0, 3).map(user => <Avatar key={user.id} src={user.avatar} />)}
          <Avatar>{getValue()}</Avatar>
        </Avatar.Group>
      ),
      meta: {
        label: 'Nhân viên',
      },
      enableSorting: false,
    },
    {
      accessorKey: 'created_at',
      header: 'Ngày tạo',
      cell: ({ getValue }) => {
        const date = dayjs(getValue()).format('DD-MM-YYYY');
        return (
          <Text size="sm" fw={400} c="dimmed">
            {date}
          </Text>
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
        />
      ),
    },
  ]);
  return (
    <>
      <DirectRoute nav="Quản lý phòng ban" subnav="Danh sách phòng ban" />

      <div className="bg-white rounded-3xl w-full shadow-xl p-4">
        <Table
          manualFiltering
          filterFunction={e => setQuery({ q: e.target.value, page: 1 })}
          manualPagination={{
            pageCount: departments?.total_pages,
          }}
          paginationFunction={page => setQuery({ page })}
          rowPerPageFunction={limit => setQuery({ limit, page: 1 })}
          onRowClick={row => navigate(`/departments/${row.original.id}`)}
          isFetching={isFetching}
          isLoading={isLoading}
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
          highlightOnHover
        />
      </div>
    </>
  );
}
