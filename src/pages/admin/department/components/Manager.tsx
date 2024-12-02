import BaseIcon from '@/components/base/BaseIcon';
import { Mock } from '@/components/base/Link/Mock';
import { ManagerProps } from '@/types/department.type';
import { Avatar, Group, Text } from '@mantine/core';
import { IconAt, IconPhoneCall } from '@tabler/icons-react';
import NotFoundUser from './not-found-user.svg?react';

export const Manager = ({ manager }: { manager: ManagerProps | null }) => {
  return (
    <>
      <div id="manager">
        <Mock href="#manager" name="Quản Lý" />
        {manager ? (
          <Group className="p-2" wrap="nowrap">
            <Avatar src={manager?.avatar} size={94} radius="md" />
            <div>
              <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                {manager?.dob?.toString()}
              </Text>
              <Text fz="lg" fw={500}>
                {manager?.fullname}
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <BaseIcon icon={IconAt} strokeWidth={1.5} className="" />
                <Text fz="xs" c="dimmed">
                  {manager?.email}
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <BaseIcon icon={IconPhoneCall} strokeWidth={1.5} className="" />
                <Text fz="xs" c="dimmed">
                  {manager?.phone_number}
                </Text>
              </Group>
            </div>
          </Group>
        ) : (
          <div className="flex">
            <NotFoundUser width={100} height={100} className="m-2" />
          </div>
        )}
      </div>
    </>
  );
};
