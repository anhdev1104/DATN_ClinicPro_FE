import { axiosBaseQuery } from '@/lib/utils/axiosBaseQuery';
import { CreateServices } from '@/pages/admin/services/CreateService';
import { UpdateServices } from '@/pages/admin/services/UpdateService';
import { Services } from '@/types/services.type';
import { createApi } from '@reduxjs/toolkit/query/react';

export const servicesApi = createApi({
  reducerPath: 'servicesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Service'],
  endpoints: builder => ({
    getServices: builder.query<ResponseTypes<Services[]>, QueryParams | void>({
      query: params => ({
        url: 'services',
        params,
      }),
      providesTags: result =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Service' as const, id })),
              { type: 'Service', id: 'SERVICES-LIST' },
            ]
          : [{ type: 'Service', id: 'SERVICES-LIST' }],
      keepUnusedDataFor: 180,
    }),
    getService: builder.query<Services, string>({
      query: id => ({ url: `services/${id}` }),
      providesTags: result => (result ? [{ type: 'Service', id: result.id }] : []),
      transformResponse: (response: { data: Services }) => response.data,
      keepUnusedDataFor: 90,
    }),
    createService: builder.mutation<{ message: string }, CreateServices>({
      query: data => ({
        url: 'services',
        method: 'POST',
        data,
      }),
      invalidatesTags: result => (result ? [{ type: 'Service', id: 'SERVICES-LIST' }] : []),
    }),
    updateService: builder.mutation<{ message: string }, { id: string } & UpdateServices>({
      query: ({ id, ...data }) => ({
        url: `services/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: (result, _, arg) => (result ? [{ type: 'Service', id: arg.id }] : []),
    }),
    deleteService: builder.mutation<{ message: string }, string>({
      query: id => ({
        url: `services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result => (result ? [{ type: 'Service', id: 'SERVICES-LIST' }] : []),
    }),
  }),
});
export const {
  useGetServiceQuery,
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
