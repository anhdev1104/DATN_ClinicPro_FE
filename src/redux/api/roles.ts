import { axiosBaseQuery } from '@/lib/utils/axiosBaseQuery';
import { ICreateRoles, IRoles, IRolesDetail } from '@/types/permissions.type';
import { createApi } from '@reduxjs/toolkit/query/react';

export const rolesApi = createApi({
  reducerPath: 'rolesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Roles'],
  endpoints: builder => ({
    getRoles: builder.query<ResponseTypes<IRoles[]>, QueryParams | void>({
      query: params => ({
        url: 'roles',
        params,
      }),
      providesTags: result =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'Roles' as const, id })), { type: 'Roles', id: 'ROLES-LIST' }]
          : [{ type: 'Roles', id: 'ROLES-LIST' }],
    }),
    getRolesDetail: builder.query<ResponseTypes<IRolesDetail>, string>({
      query: id => ({
        url: `roles/${id}`,
      }),
      providesTags: result => (result ? [{ type: 'Roles', id: result.data.id }] : []),
      keepUnusedDataFor: 90,
    }),
    addRoles: builder.mutation<{ message: string }, ICreateRoles>({
      query: data => ({
        url: 'roles',
        method: 'POST',
        data,
      }),
      invalidatesTags: result => (result ? [{ type: 'Roles', id: 'ROLES-LIST' }] : []),
    }),
    updateRoles: builder.mutation<{ message: string }, ICreateRoles>({
      query: data => ({
        url: `roles/${data.id}`,
        method: 'PUT',
        data: {
          name: data.name,
          description: data.description,
          permissions: data.permissions,
        },
      }),
      invalidatesTags: (result, _, arg) => (result ? [{ type: 'Roles', id: arg.id }] : []),
    }),
    deleteRoles: builder.mutation<{ message: string }, string>({
      query: id => ({
        url: `roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result => (result ? [{ type: 'Roles', id: 'ROLES-LIST' }] : []),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useDeleteRolesMutation,
  useAddRolesMutation,
  useGetRolesDetailQuery,
  useUpdateRolesMutation,
} = rolesApi;
