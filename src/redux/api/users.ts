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
    }),
    getUser: builder.query<unknown, { id: string }>({
      query: params => ({
        url: 'users',
        params,
      }),
    }),
    createUser: builder.mutation<unknown, CreateUserProps>({
      query: data => ({
        url: 'users',
        data,
      }),
    }),
    updateUser: builder.mutation<unknown, UpdateUserProps & { id: string }>({
      query: ({ id: params, ...data }) => ({
        url: 'users',
        params,
        data,
      }),
    }),
  }),
});
export const { useGetUsersQuery, useCreateUserMutation, useGetUserQuery, useUpdateUserMutation } = usersApi;
