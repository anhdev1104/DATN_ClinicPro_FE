import { axiosBaseQuery } from '@/config/axiosBaseQuery';
import { formatQueryParam } from '@/utils/utils';
import { Department, DepartmentDetail, NewDepartmentProps, NewDepartmentResponseProps } from '@/types/department.type';
import { createApi } from '@reduxjs/toolkit/query/react';

interface QueryParams {
  limit?: number | string;
  page?: number | string;
  q?: string;
}

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Department', 'Departments'],
  endpoints: builder => ({
    getAllDepartment: builder.query<ResponseTypes<Department[]>, QueryParams>({
      query: params => ({
        url: formatQueryParam('departments', params),
      }),
      providesTags: ['Department'],
    }),
    getDepartmentDetail: builder.query<ResponseTypes<DepartmentDetail>, number | string>({
      query: id => ({ url: `departments/${id}` }),
    }),
    addAnDepartment: builder.mutation<NewDepartmentResponseProps, NewDepartmentProps>({
      query: data => ({
        url: 'departments',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Department'],
    }),
    updateAnDepartment: builder.mutation<unknown, any & { id: string | number }>({
      query: query => {
        const { id, ...data } = query;
        return {
          url: `departments/${id}`,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: result => {
        return result ? ['Department'] : [];
      },
    }),
    deleteAnDepartment: builder.mutation<unknown, string>({
      query: id => ({
        url: `departments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Department'],
    }),
  }),
});
export const {
  useGetAllDepartmentQuery,
  useGetDepartmentDetailQuery,
  useAddAnDepartmentMutation,
  useDeleteAnDepartmentMutation,
  useUpdateAnDepartmentMutation,
} = departmentApi;
