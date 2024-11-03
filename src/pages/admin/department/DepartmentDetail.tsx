// import { useSelector } from '@/hooks/redux';
// import {
//   useDeleteAnDepartmentMutation,
//   useGetDepartmentDetailQuery,
//   useUpdateAnDepartmentMutation,
// } from '@/redux/api/department';
// import { PopupDepartmentDetail } from '@/redux/department/departmentSlice';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { AutocompleteOption, Button, FormControl, FormLabel, Input, ListItemContent } from '@mui/joy';
// import Autocomplete from '@mui/joy/Autocomplete';
// import Drawer from '@mui/joy/Drawer';
// import { Stack } from '@mui/material';
// import { Controller, useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { usersApi } from '@/redux/api/users';
// import { filterOutManagers } from '@/utils/utils';
// import { useMemo } from 'react';
// import { IUserInfo } from '@/types/user.type';
import { Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// eslint-disable-next-line react-refresh/only-export-components
import { Avatar, Text, Group } from '@mantine/core';
import BaseIcon from '@/components/base/BaseIcon';
import yup from '@/utils/locate';
import BaseTable from '@/components/base/table';

export const departmentDetailSchema = yup.object({
  name: yup.string(),
  description: yup.string(),
  manager_id: yup.string(),
});
interface Options {
  label: string;
  id: string | number;
}
const DepartmentDetail = () => {
  const [opened, { close }] = useDisclosure(false);
  // const { id } = useParams();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const open = useSelector(state => state.department.isOpenDepartmentDetail);
  // const { data: department, isSuccess } = useGetDepartmentDetailQuery(id as string, {
  //   refetchOnMountOrArgChange: true,
  // });
  // const [handleDelete] = useDeleteAnDepartmentMutation();
  // const [handleUpdate] = useUpdateAnDepartmentMutation();
  // const { currentData } = usersApi.endpoints.getAllUsers.useQuery();
  // const { isFetching } = usersApi.endpoints.getAllUsers.useQueryState();

  // const users = useMemo(() => (currentData ? filterOutManagers<IUserInfo[]>(currentData.data) : []), [isFetching]);
  // const options: Options[] = users.map((user: any) => ({ label: user.user_info.fullname, id: user.id }));

  // const { handleSubmit, control, setValue } = useForm({
  //   resolver: yupResolver(departmentDetailSchema),
  // });
  // const handleHideDrawer = () => {
  //   dispatch(PopupDepartmentDetail(false));
  //   navigate('/departments');
  // };
  // const handleDeleteDepartment = () => {
  //   if (isSuccess) {
  //     handleDelete(department.data.id as number);
  //     dispatch(PopupDepartmentDetail(false));
  //     navigate('/departments');
  //   }
  // };
  // const handleUpdateDepartment = (data: yup.InferType<typeof departmentDetailSchema>) => {
  //   if (isSuccess) {
  //     handleUpdate({ id: department?.data.id, ...data });
  //     handleHideDrawer();
  //   }
  // };
  return (
    <Paper>
      <div className="flex flex-col space-y-10">
        <div>
          <Group wrap="nowrap">
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              size={94}
              radius="md"
            />
            <div>
              <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                Software engineer
              </Text>

              <Text fz="lg" fw={500}>
                Robert Glassbreaker
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <BaseIcon name="at-sign" strokeWidth={1.5} className="" />
                <Text fz="xs" c="dimmed">
                  robert@glassbreaker.io
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <BaseIcon name="phone-call" strokeWidth={1.5} className="" />
                <Text fz="xs" c="dimmed">
                  +11 (876) 890 56 23
                </Text>
              </Group>
            </div>
          </Group>
        </div>
        <BaseTable.ScrollContainer minWidth={800}>
          <BaseTable verticalSpacing="sm">
            <BaseTable.Header>
              <BaseTable.Row>
                <BaseTable.Head>Employee</BaseTable.Head>
                <BaseTable.Head>Role</BaseTable.Head>
                <BaseTable.Head>Last active</BaseTable.Head>
                <BaseTable.Head>Status</BaseTable.Head>
              </BaseTable.Row>
            </BaseTable.Header>
            <BaseTable.Body>
              <BaseTable.Row>
                <BaseTable.Cell>
                  <Group gap="sm">
                    <Avatar size={40} src={''} radius={40} />
                    <div>
                      <Text fz="sm" fw={500}>
                        'fwefwef'
                      </Text>
                      <Text fz="xs" c="dimmed">
                        'wewefwef'
                      </Text>
                    </div>
                  </Group>
                </BaseTable.Cell>

                <BaseTable.Cell>
                  {/* <Select
          data={rolesData}
          defaultValue={item.role}
          variant="unstyled"
          allowDeselect={false}
        /> */}
                </BaseTable.Cell>
                <BaseTable.Cell> </BaseTable.Cell>
                <BaseTable.Cell>
                  {/* {item.active ? (
          <Badge fullWidth variant="light">
            Active
          </Badge>
        ) : (
          <Badge color="gray" fullWidth variant="light">
            Disabled
          </Badge>
        )} */}
                </BaseTable.Cell>
              </BaseTable.Row>
            </BaseTable.Body>
          </BaseTable>
        </BaseTable.ScrollContainer>
      </div>
    </Paper>
  );
};
export default DepartmentDetail;
