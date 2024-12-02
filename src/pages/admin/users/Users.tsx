import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import Table from '@/components/table/Table';
import TableAction from '@/components/table/TableAction';
import { useColumn } from '@/hooks/useColumn';
import { useGetUsersQuery } from '@/redux/api/users';
import { IUserInfo } from '@/types/user.type';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import BaseModal from '@/components/base/modal';
import { UserInfo } from '@/components/user-info/UserInfo';
import { Badge } from '@mantine/core';

export default function User() {
  const [opened, { close, open }] = useDisclosure();
  const { data: users, isFetching } = useGetUsersQuery();
  const navigate = useNavigate();
  const columns = useColumn<IUserInfo>([
    {
      label: 'Tên',
      key: 'user_info.fullname',
      cell: ({ value, original }) => (
        <UserInfo avatar={original?.user_info.fullname} fullname={value} email={original.email} />
      ),
    },
    {
      label: 'Địa Chỉ',
      key: 'user_info.address',
      sortable: false,
    },
    {
      label: 'date of birth',
      key: 'user_info.dob',
      sortable: false,
    },
    {
      label: 'số điện thoại',
      key: 'user_info.phone_number',
      sortable: false,
    },
    {
      label: 'Status',
      key: 'status',
      cell: ({ value }) => <Badge size="sm">{value}</Badge>,
      sortable: false,
    },
    {
      id: 'actions',
      cell: ({ row, original }) => (
        <TableAction row={row} data={[{ label: 'Xem Chi Tiết', onClick: () => navigate(original.id) }]} />
      ),
    },
  ]);

  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl p-4">
        <Table
          toolbar={
            <BaseButton.Icon onClick={open} variant="subtle" radius="lg">
              <BaseIcon icon={IconPlus} />
            </BaseButton.Icon>
          }
          onRowClick={data => navigate(data.id)}
          className="mx-2"
          highlightOnHover
          columns={columns}
          data={users?.data || []}
          isFetching={isFetching}
        />
      </div>
      <BaseModal title="Tạo Mới User" opened={opened} onClose={close}>
        <CreateUser close={close} />
      </BaseModal>
    </>
  );
}
