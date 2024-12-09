import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import { useColumn } from '@/hooks/useColumn';
import { useGetUsersQuery, useUpdateUserMutation } from '@/redux/api/users';
import { IUserInfo } from '@/types/user.type';
import { useDebouncedCallback } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import { UserInfo } from '@/components/user-info/UserInfo';
import { Pagination } from '@mantine/core';
import BaseInput from '@/components/base/input';
import { useState } from 'react';
import { modals } from '@mantine/modals';
import { STATUS } from '@/constants/define';
import { resolveErrorResponse } from '@/helpers/utils';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import toast from 'react-hot-toast';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';
import { Table, ActionWithRow } from '@/lib/table';
export default function User() {
  const [limit] = useState(5);
  const [query, setQuery] = useQueryParams({
    q: withDefault(StringParam, ''),
    limit: withDefault(NumberParam, limit),
    page: withDefault(NumberParam, 1),
  });

  const { data: users, isFetching, isLoading } = useGetUsersQuery(query as QueryParams);
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
        <ActionWithRow row={row} data={[{ label: 'Xem Chi Tiết', onClick: () => navigate(row.original.id) }]} />
      ),
    },
  ]);

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
              total={users?.total_pages || 1}
              onChange={page => setQuery({ page })}
              value={query.page || 1}
              radius="md"
              className="w-full flex justify-center py-2"
            />
          }
          columns={columns}
          data={users?.data || []}
          isFetching={isFetching || isUpdateLoading}
          isLoading={isLoading}
          rowCount={10}
        />
      </div>
    </>
  );
}
