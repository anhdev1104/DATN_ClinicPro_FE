import { ROLE } from './constants/define';

declare global {
  interface ResponseTypes<T> {
    data: T;
    next_page_url: string;
    prev_page_url: string;
    total: number;
  }
  interface QueryParams {
    limit?: string;
    page?: string;
    q?: string;
  }

  interface UserQueryParams extends QueryParams {
    role?: `${ROLE}`;
    department?: string;
  }
}
