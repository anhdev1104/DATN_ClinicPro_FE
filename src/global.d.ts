import { Row } from '@tanstack/react-table';
import { ROLE } from './constants/define';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    data?: Row<TData, TValue>;
  }
}

declare module 'yup' {
  interface StringSchema {
    omit(omitValue: Array<null | undefined | string>): this;
    password(message: string): this;
  }
  interface ObjectSchema<T> {
    safeParse(value: T): T;
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
    success: boolean;
  }
}
