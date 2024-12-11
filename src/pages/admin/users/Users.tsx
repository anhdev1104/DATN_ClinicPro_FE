import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import { useColumn } from '@/hooks/useColumn';
import { useGetUsersQuery, useUpdateUserMutation } from '@/redux/api/users';
import { IUserInfo } from '@/types/user.type';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import { UserInfo } from '@/components/user-info/UserInfo';
import BaseInput from '@/components/base/input';
import { modals } from '@mantine/modals';
import { STATUS } from '@/constants/define';
import { resolveErrorResponse } from '@/helpers/utils';
import { AxiosBaseQueryError } from '@/lib/utils/axiosBaseQuery';
import toast from 'react-hot-toast';
import { NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';
import { ActionWithRow } from '@/components/common/table';
import { Table } from '@/components/common/table/primary';
import { ROW_PER_PAGE } from '@/constants/config';

export default function User() {
  const [query, setQuery] = useQueryParams({
    q: withDefault(StringParam, ''),
    limit: withDefault(NumberParam, ROW_PER_PAGE),
    page: withDefault(NumberParam, 1),
  });

  const { data: users, isFetching, isLoading } = useGetUsersQuery(query as QueryParams);
  const [handleUpdate, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
  const navigate = useNavigate();
  const columns = useColumn<IUserInfo>([
    {
      key: 'user_info.fullname',
      header: 'Tên',
      cell: ({ value, row }) => (
        <UserInfo avatar={row.original?.user_info.fullname} fullname={value} email={row.original.email} />
      ),
      meta: {
        label: 'Tên',
      },
    },
    {
      key: 'user_info.address',
      header: 'Địa Chỉ',
      meta: {
        label: 'Địa Chỉ',
      },
      sortable: false,
    },
    {
      key: 'user_info.dob',
      header: 'Ngày sinh',
      meta: {
        label: 'Ngày sinh',
      },
      sortable: false,
    },
    {
      key: 'user_info.phone_number',
      header: 'số điện thoại',
      meta: {
        label: 'số điện thoại',
      },
      sortable: false,
    },
    {
      key: 'status',
      header: 'Status',
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
          manualFiltering
          filterFunction={e => setQuery({ q: e.target.value, page: 1 })}
          manualPagination={{ pageCount: users?.total_pages }}
          paginationFunction={page => setQuery({ page })}
          rowPerPageFunction={limit => setQuery({ limit, page: 1 })}
          columns={columns}
          data={users?.data || []}
          isFetching={isFetching || isUpdateLoading}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
