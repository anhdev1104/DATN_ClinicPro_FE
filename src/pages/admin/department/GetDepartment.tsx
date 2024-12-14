import { useGetDepartmentQuery, useUpdateDepartmentMutation } from '@/redux/api/department';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Paper, Stack } from '@mantine/core';
import { Text } from '@mantine/core';
import BaseIcon from '@/components/base/BaseIcon';
import Table from '@/components/table/Table';
import ActionWithRow from '@/components/table/TableAction';
import { IconPlus, IconTrash, IconUsersGroup } from '@tabler/icons-react';
import { useColumn } from '@/hooks/useColumn';
import { DeleteDepartment } from './components/DeleteDepartment';
import { UserProps } from '@/types/department.type';
import { Header } from './components/Header';
import { UserInfo } from '@/components/user-info/UserInfo';
import toast from 'react-hot-toast';
import { formatUserSelect, resolveErrorResponse } from '@/helpers/utils';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import { Manager } from './components/Manager';
import { Mock } from '@/components/base/Link/Mock';
import { Divider } from '@mui/material';
import NotFoundPage from '@/pages/client/404/NotFoundPage';
import BaseButton from '@/components/base/button';
import { modals } from '@mantine/modals';
import BaseInput from '@/components/base/input';
import { useGetUsersQuery } from '@/redux/api/users';
import { useMemo } from 'react';
import { renderOption } from '@/helpers/format';
import Formik from '@/lib/Formik';
import yup from '@/helpers/locate';
const schema = yup.object({
  users: yup.array().of(yup.string()).default([]),
});
export default function GetDepartment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [handleUpdate] = useUpdateDepartmentMutation();
  const { data: department, isFetching } = useGetDepartmentQuery(id!);
  const { data: users } = useGetUsersQuery();
  const listUsers = useMemo(() => formatUserSelect(users?.data || []), [users]);
  const columns = useColumn<UserProps>([
    {
      key: 'fullname',
      label: 'Nhân Viên',
      cell: ({ value, original }) => {
        return <UserInfo avatar={original.avatar} email={original.email} fullname={value} />;
      },
    },
    {
      key: 'email',
      label: 'Email',
      cell: ({ value }) => (
        <Text fz="xs" c="dimmed">
          {value}
        </Text>
      ),
      sortable: false,
    },
    {
      key: 'status',
      label: 'Trạng Thái',
      cell: ({ value }) => <Badge size="xs">{value}</Badge>,
      sortable: false,
    },
    {
      key: 'gender',
      label: 'Giới tính',
      cell: ({ value }) => (
        <Badge color="grape" size="xs">
          {value}
        </Badge>
      ),
      sortable: false,
    },
    {
      key: 'phone_number',
      label: 'Số Điện Thoại',
      sortable: false,
    },
    {
      id: 'actions',
      cell: ({ row, original }) => {
        return (
          <ActionWithRow
            data={[
              {
                label: 'Xóa',
                onClick: async () => {
                  const result = await handleUpdate({ id: id!, users_delete: [original.id] });
                  if (result.data) {
                    toast.success(result.data.message);
                    return;
                  }
                  resolveErrorResponse((result.error as AxiosBaseQueryError).data);
                },
                color: 'red',
                leftSection: <BaseIcon icon={IconTrash} />,
              },
            ]}
            row={row}
          />
        );
      },
    },
  ]);

  if (!department) {
    return <NotFoundPage title="không tìm thấy phòng ban" />;
  }
  return (
    <>
      <Paper className="p-2 rounded-3xl">
        <Header department={department || null} />
        <div className="px-2 flex flex-col space-y-4">
          <div className="space-y-2">
            <Manager manager={department?.manager || null} />
          </div>
          <Divider />
          <div id="table-user" className="space-y-2">
            <Mock href="#table-user" name="Nhân viên phòng ban" />
            <Table
              highlightOnHover
              toolbar={
                <BaseButton.Icon
                  onClick={() => {
                    modals.open({
                      title: `Thêm User Vào ${department.name}`,
                      children: (
                        <Formik
                          withAutoValidate
                          schema={schema}
                          onSubmit={async ({ users }, { setError }) => {
                            const response = await handleUpdate({ id: id!, users });
                            if (response.data) {
                              toast.success(response.data.message);
                              modals.closeAll();
                              return;
                            }
                            resolveErrorResponse((response.error as AxiosBaseQueryError).data, setError);
                          }}
                        >
                          {({ formState: { isSubmitting } }) => (
                            <Stack>
                              <BaseInput.MultiSelect
                                name="users"
                                autoComplete="users"
                                data={listUsers}
                                renderOption={renderOption}
                                leftSection={<BaseIcon icon={IconUsersGroup} />}
                                searchable
                                hidePickedOptions
                              />
                              <BaseButton disabled={isSubmitting} loading={isSubmitting} type="submit">
                                Thêm
                              </BaseButton>
                            </Stack>
                          )}
                        </Formik>
                      ),
                      size: 'md',
                    });
                  }}
                >
                  <BaseIcon icon={IconPlus} />
                </BaseButton.Icon>
              }
              onRowClick={value => navigate(`/users/${value.id}`)}
              columns={columns}
              data={department?.users || []}
              isFetching={isFetching}
            />
          </div>
          <div className="flex justify-end items-center space-x-4 my-4">
            <BaseButton
              size="xs"
              leftSection={<BaseIcon icon={IconTrash} />}
              onClick={() => {
                modals.open({
                  title: 'Xóa Phòng Ban',
                  children: <DeleteDepartment id={id!} close={modals.closeAll} />,
                  size: 'md',
                });
              }}
              color="red"
            >
              Xóa Phòng Ban
            </BaseButton>
          </div>
        </div>
      </Paper>
    </>
  );
}
