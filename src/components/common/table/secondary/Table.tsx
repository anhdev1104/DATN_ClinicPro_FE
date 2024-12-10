import { TablePlugin } from '@/@types/table';
import { usePluginTable } from '@/hooks/usePluginTable';
import { Grid, Stack } from '@mantine/core';
import { flexRender } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { TablePagination } from '../';

export default function Table<T, D>(props: TablePlugin<T, D>) {
  const table = usePluginTable(props);
  return (
    <>
      <Stack>
        <Grid>
          {table.getRowModel().rows.map(row => {
            return row.getAllCells().map(cell => {
              return (
                <Grid.Col span={4} key={cell.id}>
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
          })}
        </Grid>
        <TablePagination table={table} />
      </Stack>
    </>
  );
}
