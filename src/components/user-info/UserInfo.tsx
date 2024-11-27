import { Avatar, Group, Text } from '@mantine/core';

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
      <Group gap="sm">
        <Avatar src={avatar} size={36} radius="xl" />
        <div>
          <Text size="sm">{fullname}</Text>
          <Text size="xs" opacity={0.5}>
            {email}
          </Text>
        </div>
      </Group>
    </>
  );
};
