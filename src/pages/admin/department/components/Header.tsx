import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import { DepartmentProps } from '@/types/department.type';
import { Divider, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconPencil } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const Header = ({ department }: { department: DepartmentProps | null }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="px-2 pt-2">
        <div className="flex w-full justify-between items-center">
          <BaseButton.Icon onClick={() => navigate(-1)} variant="subtle" radius="lg">
            <BaseIcon icon={IconArrowLeft} size="xl" />
          </BaseButton.Icon>
          <Title order={3} className="mt-0">
            {department?.name}
          </Title>
          <BaseButton
            onClick={() => navigate(`/departments/${department?.id}/edit`)}
            leftSection={<BaseIcon icon={IconPencil} />}
            size="xs"
          >
            Cập Nhật
          </BaseButton>
        </div>
        <Text fz="xs" c="dimmed" fw={400} lineClamp={2} className="w-2/4 mx-auto text-center">
          {department?.description}
        </Text>
        <Divider my="sm" />
      </div>
    </>
  );
};
