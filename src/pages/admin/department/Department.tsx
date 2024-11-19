import { Flex, Modal, Pagination, Stack, Text } from '@mantine/core';
import { useGetAllDepartmentQuery, useDeleteAnDepartmentMutation } from '@/redux/api/department';
import { useNavigate } from 'react-router-dom';
import type { Department, DepartmentDetail, Manager } from '@/types/department.type';
import Table from '@/components/table/Table';
import { Avatar } from '@mantine/core';
import { Badge } from '@mantine/core';
import ActionWithRow from '@/components/table/TableAction';
import BaseButton from '@/components/base/button';
import BaseIcon from '@/components/base/BaseIcon';
import { useDebouncedCallback, useDisclosure } from '@mantine/hooks';
import NewDepartment from './NewDepartment';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useColumn } from '@/hooks/useColumn';
import { toast } from 'react-toastify';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import { useRef, useState } from 'react';
import UpdateDepartment from './UpdateDepartment';
import BaseInput from '@/components/base/input';
import { useQueryParams } from '@/hooks/useQueryParams';

const Department = () => {
  const [params, queryParams] = useQueryParams();
  const debounced = useDebouncedCallback(value => {
    queryParams.set('q', value);
  }, 1000);
  const [modalNew, handleModalNew] = useDisclosure(false);
  const [modalDelete, handleModalDelete] = useDisclosure(false);
  const [modalUpdate, handleModalUpdate] = useDisclosure(false);
  const [limit] = useState(5);
  const { data, isSuccess, isFetching } = useGetAllDepartmentQuery({
    q: params.q || '',
    limit: params.limit || limit,
    page: params.page,
  });
  const navigate = useNavigate();
  const [deleteDepartment, { isLoading }] = useDeleteAnDepartmentMutation();
  const idRef = useRef<string>('');
  const departmentUpdateRef = useRef<Department>();
  const handleRowClick = (data: Department) => {
    navigate(data.id);
  };
  const columns = useColumn<Department>([
    {
      key: 'name',
      label: 'Tên Phòng Ban',
      cell: ({ value }) => <div className="capitalize">{value}</div>,
    },
    {
      key: 'manager',
      label: 'Quản Lý',
      cell: ({ value }: { value: Manager }) => {
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
      sortable: false,
    },
    {
      key: 'users_count',
      label: 'số người trong phòng ban',
      cell: ({ value }) => <Badge size="sm">{value}</Badge>,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <ActionWithRow
          data={[
            {
              label: 'Sửa',
              onClick: () => {
                window.history.replaceState(null, '', `/departments/${row.original.id}`);
                departmentUpdateRef.current = row.original;
                handleModalUpdate.open();
              },
              leftSection: <BaseIcon icon={IconPencil} />,
            },
            {
              label: 'Xóa',
              onClick: () => {
                idRef.current = row.original.id;
                handleModalDelete.open();
              },
              color: 'red',
              leftSection: <BaseIcon icon={IconTrash} />,
            },
          ]}
          row={row as any}
        />
      ),
      placeholder: true,
    },
  ]);
  const handleDeleteDepartment = async () => {
    const result = await deleteDepartment(idRef.current);
    if (result.error) {
      toast.error((result.error as AxiosBaseQueryError<any>).data.error);
    } else {
      toast.success((result.data as any).data);
      handleModalDelete.close();
    }
  };
  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl">
        <Table
          highlightOnHover
          manualFiltering
          filterItem={
            <BaseInput onChange={e => debounced(e.target.value)} size="xs" radius="md" placeholder="tìm kiếm..." />
          }
          manualPagination
          pagination={
            Math.round((data?.total || limit) / limit) > 1 && (
              <Pagination
                total={Math.round((data?.total || limit) / limit)}
                onChange={value => queryParams.set('page', value.toString())}
                radius="md"
                defaultValue={Number(params.page) || 1}
                className="w-full flex justify-center py-2"
              />
            )
          }
          onRowClick={handleRowClick}
          isFetching={isFetching}
          data={isSuccess ? data.data : []}
          columns={columns}
          toolbar={
            <BaseButton.Icon onClick={handleModalNew.open} variant="subtle" radius="lg">
              <BaseIcon icon={IconPlus} size="md" />
            </BaseButton.Icon>
          }
        />
        <Modal
          radius="md"
          size="lg"
          centered
          opened={modalNew}
          onClose={handleModalNew.close}
          title="Tạo Mới Phòng Ban"
        >
          <NewDepartment handleClose={handleModalNew.close} />
        </Modal>
        <Modal title="Xóa Phòng Ban" centered opened={modalDelete} onClose={handleModalDelete.close}>
          <Stack gap={10}>
            <Text size="sm" c="gray">
              Bạn có chắc muốn xóa phòng ban
            </Text>
            <BaseButton
              disabled={isLoading}
              loading={isLoading}
              onClick={handleDeleteDepartment}
              className="flex justify-center w-20 ml-auto"
              color="red"
            >
              Xóa
            </BaseButton>
          </Stack>
        </Modal>
        <Modal
          title="Cập Nhật Phòng Ban"
          centered
          opened={modalUpdate}
          onClose={() => {
            navigate('/departments');
            handleModalUpdate.close();
          }}
        >
          <UpdateDepartment
            handleModalUpdate={handleModalUpdate}
            departmentUpdate={departmentUpdateRef.current as DepartmentDetail}
          />
        </Modal>
      </div>
    </>
  );
};
export default Department;
