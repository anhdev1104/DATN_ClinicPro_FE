import { Avatar, Flex, Text } from '@mantine/core';

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
      <Flex gap={8} align="center">
        <Avatar size="sm" src={user?.avatar} />
        <Flex direction="column">
          <Text size="sm">{user?.fullname}</Text>
          <Text size="xs" c="dimmed">
            {user?.email}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
