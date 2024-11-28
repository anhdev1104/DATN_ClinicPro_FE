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

export default function User() {
  const [opened, { close, open }] = useDisclosure();
  const { data, isSuccess, isFetching } = useGetUsersQuery();
  const navigate = useNavigate();
  const columns = useColumn<IUserInfo>([
    {
      label: 'Tên',
      key: 'user_info.fullname',
      meta: 'Tên',
    },
    {
      label: 'Địa Chỉ',
      key: 'user_info.address',
    },
    {
      label: 'date of birth',
      key: 'user_info.dob',
    },
    {
      label: 'số điện thoại',
      key: 'user_info.phone_number',
    },
    {
      label: 'Status',
      key: 'status',
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
          data={isSuccess ? data?.data : []}
          isFetching={isFetching}
        />
      </div>
      <BaseModal title="Tạo Mới User" opened={opened} onClose={close}>
        <CreateUser close={close} />
      </BaseModal>
    </>
  );
}
