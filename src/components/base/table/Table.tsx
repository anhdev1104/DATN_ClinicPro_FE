import { factory, Factory, TableThProps, TableTh as Th } from '@mantine/core';
import { cn } from '@/utils/utils';

export type TableThFactory = Factory<{
  props: TableThProps;
  ref: HTMLTableCellElement;
  stylesNames: 'thead';
  compound: true;
}>;

export const TableTh = factory<TableThFactory>(({ className, ...props }, ref) => {
  return <Th className={cn('p-1', className)} {...props} ref={ref} />;
});
