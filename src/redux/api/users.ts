import { axiosBaseQuery } from '@/config/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export interface QueryParams {
  limit?: number | string;
  page?: number | string;
  q?: string;
}
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getAllUsers: builder.query({
      query: () => ({
        url: 'users'
      })
    })
  })
});
export const { useGetAllUsersQuery } = usersApi;
