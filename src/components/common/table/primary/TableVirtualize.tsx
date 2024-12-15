import BaseTable from '@/components/base/table';
import { flexRender, Row, Table } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

interface TableVirtualizeProps<T> {
  parentRef: React.RefObject<HTMLDivElement>;
  table: Table<T>;
  onRowClick?: (row: Row<T>, event: React.MouseEvent) => void;
}
export const TableVirtualize = <T extends unknown>({ table, parentRef, onRowClick }: TableVirtualizeProps<T>) => {
  const virtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 34,
    overscan: 5,
    debug: true,
  });
  return virtualizer.getVirtualItems().map((virtualRow, index) => {
    const row = table.getRowModel().rows[virtualRow.index];
    return (
      <BaseTable.Row
        key={row.id}
        className="cursor-pointer"
        style={{
          height: `${virtualRow.size}px`,
          transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
        }}
      >
        {row.getVisibleCells().map(cell => {
          return (
            <BaseTable.Cell
              onClick={e => cell.column.columnDef.id !== 'actions' && onRowClick && onRowClick(row, e)}
              key={cell.id}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </BaseTable.Cell>
          );
        })}
      </BaseTable.Row>
    );
  });
};
