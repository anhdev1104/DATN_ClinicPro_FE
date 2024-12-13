import { factory, Table, TableFactory, TableProps, TableScrollContainer } from '@mantine/core';
import { TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './Table';
import { cn } from '@/helpers/utils';

interface BaseTableProps extends Omit<TableFactory, 'staticComponents' | 'props'> {
  props: TableProps & {
    parentProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  };
  staticComponents: Pick<TableFactory['staticComponents'], 'DataRenderer'> & {
    Header: typeof TableHeader;
    Body: typeof TableBody;
    Footer: typeof TableFooter;
    Cell: typeof TableCell;
    Head: typeof TableHead;
    Row: typeof TableRow;
    Caption: typeof TableCaption;
    Scroll: typeof TableScrollContainer;
  };
}
const BaseTable = factory<BaseTableProps>(({ withTableBorder, parentProps, ...props }, ref) => {
  return (
    <div
      className={cn('px-2', parentProps?.className, {
        'border rounded-md': withTableBorder,
      })}
      {...parentProps}
    >
      <Table ref={ref} {...props} />
    </div>
  );
});
BaseTable.Header = TableHeader;
BaseTable.Body = TableBody;
BaseTable.Footer = TableFooter;
BaseTable.Cell = TableCell;
BaseTable.Head = TableHead;
BaseTable.Row = TableRow;
BaseTable.Caption = TableCaption;
BaseTable.Scroll = TableScrollContainer;
BaseTable.DataRenderer = Table.DataRenderer;

BaseTable.displayName = 'Table';
export default BaseTable;
