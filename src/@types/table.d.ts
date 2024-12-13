type Biding<T> = Required<T> | Partial<Record<keyof T, never>>;
export type FilterFunction = (event: React.ChangeEvent<HTMLInputElement>) => Promise<void> | void;
export type PaginationFunction = (page: number) => Promise<void> | void;
export type RowPerPageFunction = (value: number) => Promise<void> | void;
export type ManualFiltering = { timeOut: number } | boolean;
export type ManualPaginationProps = { pageCount?: number };

export interface PaginationBase {
  manualPagination: ManualPaginationProps;
  paginationFunction: PaginationFunction;
  rowPerPageFunction: RowPerPageFunction;
}
export interface GlobalFilterBase {
  manualFiltering: ManualFiltering;
  filterFunction: FilterFunction;
}

export type ManualPagination = Biding<PaginationBase>;
export type ManualGlobalFilter = Biding<GlobalFilterBase>;

export type TablePlugin<T, D> = ManualPagination &
  ManualGlobalFilter & {
    data: T[];
    columns: ColumnDef<T, D>[];
  };
