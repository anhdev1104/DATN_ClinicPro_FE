import { axiosBaseQuery } from '@/lib/utils/axiosBaseQuery';
import { ICreatePermissions, IPermissions } from '@/types/permissions.type';
import { createApi } from '@reduxjs/toolkit/query/react';

export const permissionsApi = createApi({
  reducerPath: 'permissionsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Permissions'],
  endpoints: builder => ({
    getPermissions: builder.query<ResponseTypes<IPermissions[]>, QueryParams | void>({
      query: params => ({
        url: 'permissions',
        params,
      }),
      providesTags: result =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Permissions' as const, id })),
              { type: 'Permissions', id: 'PERMISSIONS-LIST' },
            ]
          : [{ type: 'Permissions', id: 'PERMISSIONS-LIST' }],
      keepUnusedDataFor: 120,
    }),
    getPermissionsDetail: builder.query<ResponseTypes<IPermissions>, string>({
      query: id => ({
        url: `permissions/${id}`,
      }),
      providesTags: result => (result ? [{ type: 'Permissions', id: result.data.id }] : []),
      keepUnusedDataFor: 90,
    }),
    addPermissions: builder.mutation<{ message: string }, ICreatePermissions>({
      query: data => ({
        url: 'permissions',
        method: 'POST',
        data,
      }),
      invalidatesTags: result => (result ? [{ type: 'Permissions', id: 'PERMISSIONS-LIST' }] : []),
    }),
    updatePermissions: builder.mutation<{ message: string }, ICreatePermissions>({
      query: data => ({
        url: `permissions/${data.id}`,
        method: 'PUT',
        data: {
          name: data.name,
          description: data.description,
          actions: data.actions,
        },
      }),
      invalidatesTags: (result, _, arg) => (result ? [{ type: 'Permissions', id: arg.id }] : []),
    }),
    deletePermissions: builder.mutation<{ message: string }, string>({
      query: id => ({
        url: `permissions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result => (result ? [{ type: 'Permissions', id: 'PERMISSIONS-LIST' }] : []),
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useDeletePermissionsMutation,
  useAddPermissionsMutation,
  useGetPermissionsDetailQuery,
  useUpdatePermissionsMutation,
} = permissionsApi;
