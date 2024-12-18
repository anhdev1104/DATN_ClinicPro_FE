import { axiosBaseQuery } from '@/lib/utils/axiosBaseQuery';
import { IActions, ICreateAction } from '@/types/permissions.type';
import { createApi } from '@reduxjs/toolkit/query/react';

export const actionApi = createApi({
  reducerPath: 'actionApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Action'],
  endpoints: builder => ({
    getAction: builder.query<ResponseTypes<IActions[]>, QueryParams | void>({
      query: params => ({
        url: 'actions',
        params,
      }),
      providesTags: result =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'Action' as const, id })), { type: 'Action', id: 'ACTION-LIST' }]
          : [{ type: 'Action', id: 'ACTION_LIST' }],
      keepUnusedDataFor: 120,
    }),
    getActionDetail: builder.query<ResponseTypes<IActions>, string>({
      query: id => ({
        url: `actions/${id}`,
      }),
      providesTags: result => (result ? [{ type: 'Action', id: result.data.id }] : []),
      keepUnusedDataFor: 90,
    }),
    addAction: builder.mutation<{ message: string }, ICreateAction>({
      query: data => ({
        url: 'actions',
        method: 'POST',
        data,
      }),
      invalidatesTags: result => (result ? [{ type: 'Action', id: 'ACTION-LIST' }] : []),
    }),
    updateAction: builder.mutation<{ message: string }, ICreateAction>({
      query: data => ({
        url: `actions/${data.id}`,
        method: 'PUT',
        data: {
          name: data.name,
          value: data.value,
          permission_actions: data.permission_actions,
        },
      }),
      invalidatesTags: (result, _, arg) => (result ? [{ type: 'Action', id: arg.id }] : []),
    }),
    deleteAction: builder.mutation<{ message: string }, string>({
      query: id => ({
        url: `actions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result => (result ? [{ type: 'Action', id: 'ACTION-LIST' }] : []),
    }),
  }),
});

export const {
  useGetActionQuery,
  useDeleteActionMutation,
  useAddActionMutation,
  useGetActionDetailQuery,
  useUpdateActionMutation,
} = actionApi;
