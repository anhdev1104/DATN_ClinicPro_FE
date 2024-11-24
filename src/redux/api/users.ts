import { axiosBaseQuery } from '@/helpers/axiosBaseQuery';
import { CreateUserProps, UpdateUserProps } from '@/schema/user.schema';
import { IUserInfo } from '@/types/user.type';
import { createApi } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUsers: builder.query<ResponseTypes<IUserInfo[]>, UserQueryParams | void>({
      query: params => ({
        url: 'users',
        params,
      }),
      providesTags: result =>
        result
          ? [...result?.data.map(({ id }) => ({ type: 'Users' as const, id })), { type: 'Users', id: 'LIST-USERS' }]
          : [{ type: 'Users', id: 'LIST-USERS' }],
      keepUnusedDataFor: 120,
    }),
    getUser: builder.query<any, { id: string }>({
      query: params => ({
        url: 'users',
        params,
      }),
      providesTags: result => (result ? [{ type: 'Users', id: result.id }] : []),
    }),
    createUser: builder.mutation<{ message: string }, CreateUserProps>({
      query: data => ({
        url: 'users',
        method: 'POST',
        data,
      }),
      invalidatesTags: result => (result ? [{ type: 'Users', id: 'LIST-USERS' }] : []),
    }),
    updateUser: builder.mutation<{ message: string }, UpdateUserProps>({
      query: ({ id, ...data }) => {
        return {
          url: `users/${id}`,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: (_, errors, arg) => (errors ? [] : [{ type: 'Users', id: arg.id }]),
    }),
  }),
});
export const { useGetUsersQuery, useCreateUserMutation, useGetUserQuery, useUpdateUserMutation } = usersApi;
