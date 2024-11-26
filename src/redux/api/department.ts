import { axiosBaseQuery } from '@/helpers/axiosBaseQuery';
import { CreateDepartmentProps } from '@/pages/admin/department/CreateDepartment';
import { DepartmentProps } from '@/types/department.type';
import { createApi } from '@reduxjs/toolkit/query/react';

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Department'],
  endpoints: builder => ({
    getDepartments: builder.query<ResponseTypes<DepartmentProps[]>, QueryParams | void>({
      query: params => ({
        url: 'departments',
        params,
      }),
      providesTags: result =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Department' as const, id })),
              { type: 'Department', id: 'DEPARTMENT-LIST' },
            ]
          : [{ type: 'Department', id: 'DEPARTMENT-LIST' }],
      keepUnusedDataFor: 180,
    }),
    getDepartment: builder.query<ResponseTypes<DepartmentProps>, number | string>({
      query: id => ({ url: `departments/${id}` }),
      providesTags: result =>
        result
          ? [
              { type: 'Department', id: result.data.id },
              { type: 'Department', id: 'DEPARTMENT-DETAIL' },
            ]
          : [{ type: 'Department', id: 'DEPARTMENT-DETAIL' }],
    }),
    createDepartment: builder.mutation<any, CreateDepartmentProps>({
      query: data => ({
        url: 'departments',
        method: 'POST',
        data,
      }),
      invalidatesTags: result => (result ? [{ type: 'Department', id: 'DEPARTMENT-LIST' }] : []),
    }),
    updateDepartment: builder.mutation<unknown, any & { id: string | number }>({
      query: query => {
        const { id, ...data } = query;
        return {
          url: `departments/${id}`,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: (result, _, arg) => (result ? [{ type: 'Department', id: arg.id }] : []),
    }),
    deleteDepartment: builder.mutation<unknown, string>({
      query: id => ({
        url: `departments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, _, id) =>
        result
          ? [
              { type: 'Department', id },
              { type: 'Department', id: 'DEPARTMENT-LIST' },
            ]
          : [],
    }),
  }),
});
export const {
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentApi;
