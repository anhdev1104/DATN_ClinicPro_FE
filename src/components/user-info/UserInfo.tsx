import { Avatar, Group, Text } from '@mantine/core';

interface UserProps {
  avatar?: string;
  fullname?: string;
  email?: string;
  [k: string]: any;
}
export const UserInfo = (user: UserProps) => {
  if (!user) {
    return 'Chưa Có';
  }
  return (
    <>
      <Group gap="sm">
        <Avatar src={user?.avatar} size={36} radius="xl" />
        <div>
          <Text size="sm">{user?.fullname}</Text>
          <Text size="xs" opacity={0.5}>
            {user?.email}
          </Text>
        </div>
      </Group>
    </>
  );
};
