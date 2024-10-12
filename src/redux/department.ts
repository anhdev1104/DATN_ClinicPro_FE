import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;

export const departmentApi = createApi({
  reducerPath: 'departments',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3N1Z2FyLmlkLnZuL2FwaS92MS9hdXRoL2xvZ2luIiwiaWF0IjoxNzI4NDYwMDQ5LCJleHAiOjE3Mjg0NjcyNDksIm5iZiI6MTcyODQ2MDA0OSwianRpIjoiYWd4bkxva1NSNFRpR2RGNSIsInN1YiI6IjI3IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.uoPMxThgjLY_fufnBGo1tgjwU4Uf2vXMKXO2RpKr7QM',
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllDepartment: builder.query({
      query: () => 'departments',
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetAllDepartmentQuery } = departmentApi;
