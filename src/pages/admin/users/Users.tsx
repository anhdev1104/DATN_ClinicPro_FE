import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import Table from '@/components/table/Table';
import TableAction from '@/components/table/TableAction';
import { useColumn } from '@/hooks/useColumn';
import { useGetUsersQuery } from '@/redux/api/users';
import { IUserInfo } from '@/types/user.type';
import { useDebouncedCallback, useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import BaseModal from '@/components/base/modal';
import { UserInfo } from '@/components/user-info/UserInfo';
import { Badge, Pagination } from '@mantine/core';
import NotFoundPage from '@/pages/client/404/NotFoundPage';
import BaseInput from '@/components/base/input';
import { useState } from 'react';

export default function User() {
  const [opened, { close, open }] = useDisclosure();
  const [params, setParams] = useSearchParams();
  const [limit] = useState(5);
  const {
    data: users,
    isFetching,
    error,
  } = useGetUsersQuery({
    q: params.get('q')!,
    limit: params.get('limit') || limit.toString(),
    page: params.get('page')!,
  });
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
  const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) params.set('q', value);
    else params.delete('q');
    params.set('page', '1');
    setParams(params.toString());
  }, 500);

  if (error) return <NotFoundPage title="Có lỗi xảy ra! vui lòng tải lại trang" />;
  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl p-4">
        <Table
          toolbar={
            <BaseButton.Icon onClick={open} variant="subtle" radius="lg">
              <BaseIcon icon={IconPlus} />
            </BaseButton.Icon>
          }
          manualFiltering
          filterItem={
            <BaseInput
              defaultValue={params.get('q') ?? ''}
              onChange={handleSearch}
              size="xs"
              radius="md"
              placeholder="tìm kiếm..."
            />
          }
          manualPagination
          pagination={
            <Pagination
              total={Number(users?.totalPage) || 1}
              onChange={value => {
                params.set('page', value.toString());
                setParams(params.toString());
              }}
              radius="md"
              defaultValue={Number(params.get('page')) || 1}
              className="w-full flex justify-center py-2"
            />
          }
          columns={columns}
          data={users?.data || []}
          isFetching={isFetching}
          onRowClick={data => navigate(data.id)}
          className="mx-2"
          highlightOnHover
        />
      </div>
      <BaseModal title="Tạo Mới User" opened={opened} onClose={close}>
        <CreateUser close={close} />
      </BaseModal>
    </>
  );
}
