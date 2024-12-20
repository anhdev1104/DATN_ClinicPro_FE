import { TablePlugin } from '@/@types/table';
import { usePluginTable } from '@/hooks/usePluginTable';
import { Center, Grid, Skeleton, Stack } from '@mantine/core';
import { flexRender } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { TablePagination } from '../';

type TableProps<T, D> = TablePlugin<T, D> & {
  isLoading?: boolean;
};
export default function Table<T, D>({ isLoading, ...props }: TableProps<T, D>) {
  const table = usePluginTable(props);
  return (
    <>
      <Stack>
        <Grid>
          {isLoading ? (
            [...new Array(props.columns.length * 6)].map((_, index) => (
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={index} className="min-h-48">
                <Skeleton className="h-full" />
              </Grid.Col>
            ))
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => {
              return row.getAllCells().map(cell => {
                return (
                  <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={cell.id} className="min-h-48">
                    <motion.div
                      drag
                      dragConstraints={{ left: 5, right: 5, top: 5, bottom: 5 }}
                      dragSnapToOrigin
                      whileTap={{ scale: 0.95 }}
                      className="w-full h-full"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </motion.div>
                  </Grid.Col>
                );
              });
            })
          ) : (
            <Grid.Col span={12}>
              <Center className="h-32">không có kết quả hiển thị</Center>
            </Grid.Col>
          )}
        </Grid>
        <TablePagination table={table} />
      </Stack>
    </>
  );
}
