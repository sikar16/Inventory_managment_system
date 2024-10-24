import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import extractErrorMessage from "../util/extractErrorMessage";
import { SupplierType } from "../_types/supplier_type";
import { getToken } from "../util/getToken";

const baseUrl = import.meta.env.VITE_API_URL;

export const supplierApi = createApi({
  reducerPath: "supplierApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}supplier`,
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["supplier"], // Define the tags
  endpoints: (builder) => ({
    getAllSupplier: builder.query<SupplierType[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) =>
        response.success
          ? (response.data as SupplierType[])
          : ([] as SupplierType[]),
      providesTags: ["supplier"], // Provide tags for this query
    }),
    addNewSupplier: builder.mutation<void, SupplierType>({
      query: (data) => ({
        url: `/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["supplier"], // Invalidate cache after mutation
      transformErrorResponse: (response: any) => {
        console.log(response);
        return extractErrorMessage(response.data.message as string);
      },
    }),
    updateSupplier: builder.mutation<void, { id: number; data: SupplierType }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT", // Use PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["supplier"], // Invalidate cache after mutation
      transformErrorResponse: (response: any) => {
        console.log(response);
        return extractErrorMessage(response.data.message as string);
      },
    }),
    deleteSupplier: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["supplier"],
      transformErrorResponse: (response: any) => {
        console.log(response);
        return extractErrorMessage(response.data.message as string);
      },
    }),
  }),
});

export const {
  useGetAllSupplierQuery,
  useAddNewSupplierMutation,
  useUpdateSupplierMutation, // Export the new hook for updating suppliers
  useDeleteSupplierMutation,
} = supplierApi;
