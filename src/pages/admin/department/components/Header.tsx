import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import { useGetDepartmentQuery } from '@/redux/api/department';
import { Divider, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconPencil } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

export const Header = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: department } = useGetDepartmentQuery(id as string);
  return (
    <>
      <div className="">
        <div className="p-2 flex justify-between items-center">
          <BaseButton.Icon onClick={() => navigate(-1)} variant="subtle" radius="lg">
            <BaseIcon icon={IconArrowLeft} size="xl" />
          </BaseButton.Icon>
          <Title order={3} className="mt-0">
            {department?.name}
          </Title>
          <BaseButton leftSection={<BaseIcon icon={IconPencil} />} size="xs">
            Cập Nhật
          </BaseButton>
        </div>
        <Text fz="xs" c="dimmed" fw={400} lineClamp={2} className="text-center w-2/4 mx-auto">
          {department?.description}
        </Text>
        <Divider my="sm" />
      </div>
    </>
  );
};
