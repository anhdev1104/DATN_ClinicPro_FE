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
      <DirectRoute nav="Quản lý phòng ban" subnav="Danh sách phòng ban" />

      <div className="bg-white rounded-3xl w-full shadow-xl p-4">
        <Table
          manualFiltering
          filterFunction={e => setQuery({ q: e.target.value, page: 1 })}
          manualPagination={{
            rowCount: departments?.data.length,
            pageCount: departments?.total_pages,
            pageIndex: query.page - 1,
            pageSize: query.limit,
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
          tableProps={{
            highlightOnHover: true,
          }}
        />
      </div>
    </>
  );
}
