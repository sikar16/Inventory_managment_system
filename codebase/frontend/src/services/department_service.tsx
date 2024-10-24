import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DepartmentType } from "../_types/department_type";
import { getToken } from "../util/getToken";
import extractErrorMessage from "../util/extractErrorMessage";

const baseUrl = import.meta.env.VITE_API_URL;

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}department`,
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Department"], // This ensures refetching works correctly
  endpoints: (builder) => ({
    getAllDepartment: builder.query<DepartmentType[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) =>
        response.success
          ? (response.data as DepartmentType[])
          : ([] as DepartmentType[]),
      providesTags: ["Department"], // Ensures data is refetched when invalidated
    }),
    getSingleDepartment: builder.query<DepartmentType, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) =>
        response.success
          ? (response.data as DepartmentType)
          : ({} as DepartmentType),
      providesTags: (_result, _error, id) => [{ type: "Department", id }],
    }),
    addNewDepartment: builder.mutation({
      query: (body: { name: string }) => ({
        url: `/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Department"], // Ensures refetching after creation
      transformResponse: (response: any) => {
        console.log(response);
        return response.success ? response.message : "something happened";
      },
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message;
        return extractErrorMessage(message);
      },
    }),
    updateDepartment: builder.mutation({
      query: ({
        body,
        params,
      }: {
        body: { name: string };
        params: number;
      }) => ({
        url: `/${params}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Department"], // Ensures refetching after update
      transformResponse: (response: any) => {
        console.log(response);
        return response.success ? response.message : "something happened";
      },
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message;
        return extractErrorMessage(message);
      },
    }),
    deleteDepartment: builder.mutation({
      query: ({ params }: { params: number }) => ({
        url: `/${params}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"], // Ensures refetching after deletion
      transformResponse: (response: any) => {
        console.log(response);
        return response.success ? response.message : "something happened";
      },
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message;
        return extractErrorMessage(message);
      },
    }),
  }),
});

export const {
  useGetAllDepartmentQuery,
  useGetSingleDepartmentQuery,
  useAddNewDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
