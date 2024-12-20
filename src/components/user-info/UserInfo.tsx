import { Avatar, Flex, Text } from '@mantine/core';

interface UserProps {
  avatar?: string;
  fullname?: string;
  email?: string;
  [k: string]: any;
}
export const UserInfo = ({ avatar, email, fullname }: UserProps) => {
  if (!avatar && !email && !fullname) {
    return 'Chưa Có';
  }
  return (
    <>
      <Flex gap={4}>
        <Avatar src={avatar} size={36} radius="xl" />
        <Flex direction="column">
          <Text size="sm">{fullname}</Text>
          <Text size="xs" c="dimmed">
            {email}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
