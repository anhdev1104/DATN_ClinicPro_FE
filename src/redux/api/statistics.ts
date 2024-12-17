import { axiosBaseQuery } from '@/lib/utils/axiosBaseQuery';
import {
  StatisticAppointmentsByMonth,
  StatisticAppointmentsByStatus,
  StatisticsPatient,
} from '@/types/statistics.type';
import { createApi } from '@reduxjs/toolkit/query/react';

export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getStatisticPatient: builder.query<StatisticsPatient, { year?: number } | void>({
      query: params => ({
        url: 'statistics/patient',
        params,
      }),
      transformResponse: (result: { data: StatisticsPatient }) => result.data,
    }),
    getStatisticAppointments: builder.query<StatisticsPatient, { year?: number } | void>({
      query: params => ({
        url: 'statistics/appointment',
        params,
      }),
      transformResponse: (result: { data: StatisticsPatient }) => result.data,
    }),
    getStatisticAppointmentsByMonth: builder.query<StatisticAppointmentsByMonth[], number | void>({
      query: endPoint => {
        const year = endPoint || new Date().getFullYear();
        return {
          url: `statistics/getAppointmentsByMonth/${year}`,
        };
      },
      transformResponse: (result: { data: StatisticAppointmentsByMonth[] }) => result.data,
      keepUnusedDataFor: 180,
    }),
    getStatisticAppointmentsByStatus: builder.query<StatisticAppointmentsByStatus[], { year?: number } | void>({
      query: params => ({
        url: 'statistics/getAppointmentsByStatus',
        params,
      }),
      transformResponse: (result: { data: StatisticAppointmentsByStatus[] }) => result.data,
    }),
  }),
});
export const {
  useGetStatisticPatientQuery,
  useGetStatisticAppointmentsByStatusQuery,
  useGetStatisticAppointmentsQuery,
  useGetStatisticAppointmentsByMonthQuery,
} = statisticsApi;
