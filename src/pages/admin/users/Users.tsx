import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import Table from '@/components/table/Table';
import TableAction from '@/components/table/TableAction';
import { useColumn } from '@/hooks/useColumn';
import { useGetUsersQuery, useUpdateUserMutation } from '@/redux/api/users';
import { IUserInfo } from '@/types/user.type';
import { useDebouncedCallback } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import { UserInfo } from '@/components/user-info/UserInfo';
import { Pagination } from '@mantine/core';
import BaseInput from '@/components/base/input';
import { useMemo, useState } from 'react';
import { modals } from '@mantine/modals';
import { STATUS } from '@/constants/define';
import { resolveErrorResponse } from '@/helpers/utils';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import toast from 'react-hot-toast';

export default function User() {
  const [params, setParams] = useSearchParams();
  const [limit] = useState(5);
  const queryKey = useMemo(
    () => ({
      q: params.get('q')!,
      limit: params.get('limit') || limit.toString(),
      page: params.get('page')!,
    }),
    [params],
  );

  const { data: users, isFetching, isLoading } = useGetUsersQuery(queryKey);
  const [handleUpdate, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
  const navigate = useNavigate();
  const columns = useColumn<IUserInfo>([
    {
      header: 'Tên',
      key: 'user_info.fullname',
      cell: ({ value, row }) => (
        <UserInfo avatar={row.original?.user_info.fullname} fullname={value} email={row.original.email} />
      ),
      meta: {
        label: 'Tên',
      },
    },
    {
      header: 'Địa Chỉ',
      key: 'user_info.address',
      meta: {
        label: 'Địa Chỉ',
      },
      sortable: false,
    },
    {
      header: 'Ngày sinh',
      key: 'user_info.dob',
      meta: {
        label: 'Ngày sinh',
      },
      sortable: false,
    },
    {
      header: 'số điện thoại',
      key: 'user_info.phone_number',
      meta: {
        label: 'số điện thoại',
      },
      sortable: false,
    },
    {
      header: 'Status',
      key: 'status',
      cell: ({ value, row }) => (
        <BaseInput.Select
          variant="unstyled"
          data={Object.values(STATUS)}
          defaultValue={value}
          className="max-w-32"
          allowDeselect={false}
          onChange={async value => {
            const response = await handleUpdate({ id: row.original.id, status: value as `${STATUS}` });
            if (response.data) {
              toast.success(response.data.message);
              return;
            }
            resolveErrorResponse((response.error as AxiosBaseQueryError).data);
          }}
        />
      ),
      meta: {
        label: 'Status',
      },
      sortable: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <TableAction row={row} data={[{ label: 'Xem Chi Tiết', onClick: () => navigate(row.original.id) }]} />
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

  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl p-4">
        <Table
          toolbar={
            <BaseButton.Icon
              onClick={() => {
                modals.open({
                  title: 'Tạo Mới User',
                  children: <CreateUser close={modals.closeAll} />,
                  size: 'auto',
                });
              }}
              variant="subtle"
              radius="lg"
            >
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
              total={Number(users?.total_pages) || 1}
              onChange={value => {
                params.set('page', value.toString());
                setParams(params.toString());
              }}
              value={Number(params.get('page')) || 1}
              radius="md"
              className="w-full flex justify-center py-2"
            />
          }
          columns={columns}
          data={users?.data || []}
          isFetching={isFetching || isUpdateLoading}
          isLoading={isLoading}
          className="mx-2"
        />
      </div>
    </>
  );
}
