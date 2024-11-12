import { Flex, Text } from '@mantine/core';
import { useGetAllDepartmentQuery } from '@/redux/api/department';
import { useNavigate } from 'react-router-dom';
import type { Department, Manager } from '@/types/department.type';
import { ColumnDef } from '@tanstack/react-table';
import Table from '@/components/table/Table';
import { Avatar } from '@mantine/core';
import { Badge } from '@mantine/core';
import HeaderTable from '@/components/table/HeaderTable';
import ActionWithRow from '@/components/table/ActionWithRow';

const columns: ColumnDef<Department>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <HeaderTable column={column} title="Tên Phòng Ban" />,
    cell: ({ row }) => <div className="capitalize">{row.getValue('name') as string}</div>,
  },
  {
    accessorKey: 'manager',
    header: ({ column }) => <HeaderTable column={column} title="Quản Lý" />,
    cell: ({ row }) => {
      const value = row.getValue<Manager>('manager');
      return value ? (
        <Flex gap={8} align="center">
          <Avatar size="sm" src={value.avatar} />
          <Flex direction="column">
            <Text size="sm">{value.fullname}</Text>
            <Text size="xs" c="dimmed">
              {value.email}
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Text size="sm">Chưa Có</Text>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'users_count',
    header: ({ column }) => <HeaderTable column={column} title="số người trong phòng ban" />,
    cell: ({ row }) => <Badge size="sm">{row.getValue('users_count')}</Badge>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionWithRow row={row as any} />,
  },
];

const Department = () => {
  const { data, isSuccess, isFetching } = useGetAllDepartmentQuery({});
  const navigate = useNavigate();
  const handleRowClick = (data: Department) => {
    navigate(data.id);
  };
  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl">
        <Table
          onRowClick={handleRowClick}
          isFetching={isFetching}
          data={isSuccess ? data.data : []}
          columns={columns}
        />
      </div>
    </>
  );
};
export default Department;
