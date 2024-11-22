import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import Table from '@/components/table/Table';
import TableAction from '@/components/table/TableAction';
import { useColumn } from '@/hooks/useColumn';
import { useGetUsersQuery } from '@/redux/api/users';
import { IUserInfo } from '@/types/user.type';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const { data, isSuccess, isFetching } = useGetUsersQuery();
  const navigate = useNavigate();
  const columns = useColumn<IUserInfo>([
    {
      label: 'Tên',
      key: 'user_info.fullname',
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
        <TableAction row={row} data={[{ label: 'Sửa', onClick: () => navigate(`${original.id}/edit`) }]} />
      ),
    },
  ]);
  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl">
        <Table
          toolbar={
            <BaseButton.Icon onClick={() => navigate('add')} variant="subtle" radius="lg">
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
    </>
  );
};
export default User;