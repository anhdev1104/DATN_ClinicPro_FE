import { TablePlugin } from '@/@types/table';
import { usePluginTable } from '@/hooks/usePluginTable';
import { Grid, Stack } from '@mantine/core';
import { flexRender } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { TablePagination } from '../';
import { useEffect, useState } from 'react';
import { LoadingSkeleton } from '@/components/loading';

export default function Table<T, D>(props: TablePlugin<T, D>) {
  const table = usePluginTable(props);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (props.data.length > 0) {
      setIsLoading(false);
    }
  }, [props.data]);

  return (
    <>
      <Stack>
        <Grid>
          {isLoading && new Array(6).fill(0).map((_, index) => <TableSkeleton key={index} />)}
          {!isLoading &&
            table.getRowModel().rows.map(row => {
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

const TableSkeleton = () => {
  return (
    <Grid.Col span={4}>
      <LoadingSkeleton className="w-full h-[167px] rounded-md" />
    </Grid.Col>
  );
};
