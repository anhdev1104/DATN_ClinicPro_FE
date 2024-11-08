import { Skeleton, Stack } from '@mantine/core';

const TableSkeleton = () => {
  return (
    <>
      <Stack gap={30}>
        <Skeleton height={22} radius={4} />
        <Skeleton height={22} radius={4} />
        <Skeleton height={22} radius={4} />
        <Skeleton height={22} radius={4} />
        <Skeleton height={22} radius={4} />
        <Skeleton height={22} radius={4} />
      </Stack>
    </>
  );
};
export default TableSkeleton;
