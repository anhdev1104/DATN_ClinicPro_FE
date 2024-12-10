import { useDeleteServiceMutation, useGetServicesQuery } from '@/redux/api/services';
import { Table } from '@/components/common/table/secondary';
import { useColumn } from '@/hooks/useColumn';
import { Services } from '@/types/services.type';
import { Badge, Card, Flex, Group, NumberFormatter, Stack, Text } from '@mantine/core';
import { NumberParam, useQueryParams, withDefault } from 'use-query-params';
import { ROW_PER_PAGE } from '@/constants/config';
import BaseButton from '@/components/base/button';
import BaseIcon from '@/components/base/BaseIcon';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import toast from 'react-hot-toast';
import { resolveErrorResponse } from '@/helpers/utils';
import CreateServices from './CreateService';
import { AxiosBaseQueryError } from '@/lib/utils/axiosBaseQuery';
import UpdateService from './UpdateService';

export default function ServicesPage() {
  const [query, setQuery] = useQueryParams({
    limit: withDefault(NumberParam, ROW_PER_PAGE),
    page: withDefault(NumberParam, 1),
  });
  const { data } = useGetServicesQuery(query);
  const [handleDelete] = useDeleteServiceMutation();
  const columns = useColumn<Services>([
    {
      id: 'services',
      cell: ({ row }) => (
        <Card shadow="md" padding="lg" radius="md" withBorder className="w-full h-full cursor-pointer">
          <Stack className="text-start w-full items-stretch">
            <Text fw={500}>{row.original.service_name}</Text>
            <Text size="sm" c="dimmed" lineClamp={3}>
              {row.original.description}
            </Text>
            <Flex justify="space-between">
              <Group gap="xs">
                <BaseButton.Icon
                  onClick={() => {
                    modals.openConfirmModal({
                      title: `Bạn Chắn Chắn Muốn Xóa ${row.original.service_name}`,
                      children: <Text size="sm">khi xóa bạn không thể khôi phục được nữa</Text>,
                      size: 'md',
                      confirmProps: { color: 'red' },
                      labels: { cancel: 'Hủy', confirm: 'Xóa' },
                      onConfirm: async () => {
                        const response = await handleDelete(row.original.id);
                        if (response.data) {
                          toast.success(response.data.message);
                          return;
                        }
                        resolveErrorResponse((response.error as AxiosBaseQueryError).data);
                      },
                    });
                  }}
                  variant="subtle"
                  color="red"
                >
                  <BaseIcon icon={IconTrash} />
                </BaseButton.Icon>
                <BaseButton.Icon
                  onClick={() => {
                    modals.open({
                      title: `Cập Nhật ${row.original.service_name}`,
                      children: <UpdateService close={modals.closeAll} {...row.original} />,
                    });
                  }}
                  variant="subtle"
                >
                  <BaseIcon icon={IconPencil} />
                </BaseButton.Icon>
              </Group>
              <Badge color="pink">
                <NumberFormatter suffix="VNĐ " value={row.original.price} thousandSeparator />
              </Badge>
            </Flex>
          </Stack>
        </Card>
      ),
    },
  ]);
  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl p-4 space-y-4">
        <BaseButton.Icon
          onClick={() => {
            modals.open({
              title: 'Tạo Mới Dịch Vụ',
              children: <CreateServices close={modals.closeAll} />,
            });
          }}
          className="flex ml-auto"
          size="lg"
        >
          <BaseIcon size="lg" icon={IconPlus} />
        </BaseButton.Icon>
        <Table
          manualPagination={{
            rowCount: data?.data.length,
            pageCount: data?.total_pages,
            pageIndex: query.page - 1,
            pageSize: query.limit,
          }}
          paginationFunction={page => setQuery({ page })}
          rowPerPageFunction={limit => setQuery({ limit, page: 1 })}
          data={data?.data || []}
          columns={columns}
        />
      </div>
    </>
  );
}
