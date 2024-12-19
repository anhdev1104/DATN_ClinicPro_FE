import { GlobalFilterBase, PaginationBase } from './@types/table';
import { ROLE } from './constants/define';
declare module '@tanstack/react-table' {
  interface ColumnMeta {
    label?: string;
  }
  interface TableMeta extends Required<QueryParams>, Partial<PaginationBase>, Partial<GlobalFilterBase> {
    virtualize?: {
      length: number;
    };
  }
}

declare module 'yup' {
  interface StringSchema {
    omit(omit: Array<null | undefined | string>): this;
    password(message: string): this;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ObjectSchema<T = any> {
    safeParse(data: any): any;
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
