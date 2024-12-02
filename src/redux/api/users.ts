import { axiosBaseQuery } from '@/helpers/axiosBaseQuery';
import { CreateUserProps } from '@/pages/admin/users/components/CreateUser';
import { UpdateUserProps } from '@/pages/admin/users/UpdateUser';
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
    getUser: builder.query<IUserInfo, string>({
      query: id => ({
        url: `users/${id}`,
      }),
      providesTags: result => (result ? [{ type: 'Users', id: result.id }] : []),
      transformResponse: (response: { data: IUserInfo }) => response.data,
      keepUnusedDataFor: 90,
    }),
    createUser: builder.mutation<{ message: string }, CreateUserProps>({
      query: data => ({
        url: 'users',
        method: 'POST',
        data,
      }),
      invalidatesTags: result => (result ? [{ type: 'Users', id: 'LIST-USERS' }] : []),
    }),
    updateUser: builder.mutation<{ message: string }, UpdateUserProps & { id: string }>({
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
