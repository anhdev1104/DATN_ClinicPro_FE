import { IconLink } from '@tabler/icons-react';
import BaseIcon from '../BaseIcon';
import { Text } from '@mantine/core';
export const Mock = ({ href, name }: { href: string; name: string }) => {
  return (
    <a href={href} className="flex space-x-1 items-center hover:text-blue-400 cursor-pointer">
      <BaseIcon icon={IconLink} />
      <Text size="lg" className="capitalize font-bold" variant="gradient">
        {name}
      </Text>
    </a>
  );
};
