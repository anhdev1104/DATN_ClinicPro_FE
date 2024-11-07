import {
  factory,
  Table,
  TableCaption,
  TableFactory,
  TableScrollContainer,
  TableTbody,
  TableTd,
  TableTfoot,
  TableThead,
  TableTr,
} from '@mantine/core';
import { TableTh } from './Table';

interface StaticComponents {
  Thead: typeof TableThead;
  Tbody: typeof TableTbody;
  Tfoot: typeof TableTfoot;
  Td: typeof TableTd;
  Th: typeof TableTh;
  Tr: typeof TableTr;
}
type U = Exclude<keyof TableFactory['staticComponents'], keyof StaticComponents>;
interface TableProps extends Omit<TableFactory, 'staticComponents'> {
  staticComponents: Pick<TableFactory['staticComponents'], U> & {
    Header: typeof TableThead;
    Body: typeof TableTbody;
    Footer: typeof TableTfoot;
    Cell: typeof TableTd;
    Head: typeof TableTh;
    Row: typeof TableTr;
  };
}
const BaseTable = factory<TableProps>((props, ref) => {
  return <Table {...props} ref={ref} />;
});

BaseTable.Header = TableThead;
BaseTable.Body = TableTbody;
BaseTable.Footer = TableTfoot;
BaseTable.Cell = TableTd;
BaseTable.Head = TableTh;
BaseTable.Row = TableTr;
BaseTable.ScrollContainer = TableScrollContainer;
BaseTable.Caption = TableCaption;
BaseTable.DataRenderer = Table.DataRenderer;

BaseTable.displayName = 'Table';
export default BaseTable;
