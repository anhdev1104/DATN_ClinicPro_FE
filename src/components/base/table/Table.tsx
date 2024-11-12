import {
  TableThProps,
  TableTh,
  TableTheadProps,
  TableThead,
  TableTfoot,
  TableTfootProps,
  TableTd,
  TableTdProps,
  TableCaption as TableCaptions,
  TableCaptionProps,
  TableTr,
  TableTrProps,
  TableTbody,
  TableTbodyProps,
} from '@mantine/core';
import { cn } from '@/helpers/utils';
import { forwardRef } from 'react';

export const TableHead = forwardRef<HTMLTableCellElement, TableThProps>(({ className, ...props }, ref) => {
  return (
    <TableTh className={cn('py-1 px-2 h-10 text-left align-middle font-medium', className)} {...props} ref={ref} />
  );
});

export const TableHeader = forwardRef<HTMLTableSectionElement, TableTheadProps>((props, ref) => {
  return <TableThead ref={ref} {...props} />;
});

export const TableFooter = forwardRef<HTMLTableSectionElement, TableTfootProps>((props, ref) => {
  return <TableTfoot ref={ref} {...props} />;
});

export const TableCell = forwardRef<HTMLTableCellElement, TableTdProps>(({ className, ...props }, ref) => {
  return <TableTd ref={ref} className={cn('align-middle', className)} {...props} />;
});

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>((props, ref) => {
  return <TableCaptions ref={ref} {...props} />;
});

export const TableRow = forwardRef<HTMLTableRowElement, TableTrProps>((props, ref) => {
  return <TableTr ref={ref} {...props} />;
});

export const TableBody = forwardRef<HTMLTableSectionElement, TableTbodyProps>((props, ref) => {
  return <TableTbody ref={ref} {...props} />;
});
