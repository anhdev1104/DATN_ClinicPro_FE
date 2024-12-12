import { Skeleton, Stack } from '@mantine/core';

export default function TableSkeleton() {
  return (
    <>
      <Stack gap={30}>
        <Skeleton height={22} className="rounded-md" />
      </Stack>
    </>
  );
}