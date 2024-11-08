import { axiosBaseQuery } from '@/config/axiosBaseQuery';
import { formatQueryParam } from '@/utils/utils';
import { departmentSchema } from '@/pages/admin/department/NewDepartment';
import { Department } from '@/types/department.type';
import { createApi } from '@reduxjs/toolkit/query/react';
import { InferType } from 'yup';
import { departmentDetailSchema } from '@/pages/admin/department/DepartmentDetail';

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
    getDepartmentDetail: builder.query<ResponseTypes<Department>, number | string>({
      query: id => ({ url: `departments/${id}` }),
    }),
    addAnDepartment: builder.mutation({
      query: (data: InferType<typeof departmentSchema>) => ({
        url: 'departments',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Department'],
    }),
    updateAnDepartment: builder.mutation<unknown, InferType<typeof departmentDetailSchema> & { id: string | number }>({
      query: query => {
        const { id, ...data } = query;
        return {
          url: `departments/${id}`,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: ['Department'],
    }),
    deleteAnDepartment: builder.mutation<unknown, number | string>({
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
