import { ROLE } from './constants/define';
import {
  FilterFunction,
  ManualFiltering,
  ManualPaginationProps,
  PaginationFunction,
  RowPerPageFunction,
} from './@types/table';

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    label?: string;
  }
  interface TableMeta {
    paginationFunction?: PaginationFunction;
    filterFunction?: FilterFunction;
    rowPerPageFunction?: RowPerPageFunction;
    manualFiltering?: ManualFiltering;
    manualPagination?: ManualPaginationProps;
  }
}

declare module 'yup' {
  interface StringSchema {
    omit(omit: Array<null | undefined | string>): this;
    password(message: string): this;
  }
  interface ObjectSchema<T> {
    safeParse(data: T): T;
  }
}

declare global {
  interface ResponseTypes<T> {
    data: T;
    next_page_url: string | null;
    prev_page_url: string | null;
    total: number;
    total_pages: number;
  }
  interface QueryParams {
    limit?: number;
    page?: number;
    q?: string;
  }

  interface UserQueryParams extends QueryParams {
    role?: `${ROLE}`;
    department?: string;
  }
  interface ErrorResponse {
    errors?: { [k: string]: string | string[] };
    message: string;
    success?: boolean;
  }
}
