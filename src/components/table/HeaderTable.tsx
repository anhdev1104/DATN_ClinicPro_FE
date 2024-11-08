import { cn } from '@/helpers/utils';
import { Column } from '@tanstack/react-table';
import { Button } from '@mantine/core';
import BaseIcon from '../base/BaseIcon';
interface HeaderTableProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

const HeaderTable = <T, D>({ column, title, className }: HeaderTableProps<T, D>) => {
  if (!column.getCanSort()) {
    return <div className={cn('text-gray-400 text-sm', className)}>{title}</div>;
  }
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-8 focus:transform-cpu font-medium"
        size="compact-sm"
        radius="md"
        variant="subtle"
        color="gray"
        rightSection={<BaseIcon name="arrow-up-down" />}
      >
        {title}
      </Button>
    </div>
  );
};
export default HeaderTable;
