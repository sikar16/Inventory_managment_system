import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supplierCategoryType } from "../_types/supplierCategory_type";
import extractErrorMessage from "../util/extractErrorMessage";
import { getToken } from "../util/getToken";

const baseUrl = import.meta.env.VITE_API_URL;

export const supplierCategoryApi = createApi({
  reducerPath: "supplierCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}supplierCategory`,
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["supplierCategory"],
  endpoints: (builder) => ({
    getAllSupplierCategory: builder.query<supplierCategoryType[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) =>
        response.success
          ? (response.data as supplierCategoryType[])
          : ([] as supplierCategoryType[]),
      providesTags: ["supplierCategory"],
    }),

    addNewSupplierCategory: builder.mutation({
      query: ({ data }: { data: { name: string } }) => ({
        url: `/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["supplierCategory"], // Invalidate cache after mutation
      transformErrorResponse: (response: any) => {
        return (
          extractErrorMessage(response?.data?.message as string) ||
          "An unexpected error occurred."
        );
      },
    }),

    updateSupplierCategory: builder.mutation({
      query: ({ id, data }: { id: number; data: { name: string } }) => ({
        url: `/${id}`,
        method: "PUT", // Use PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["supplierCategory"], // Invalidate cache after mutation
      transformErrorResponse: (response: any) => {
        return (
          extractErrorMessage(response?.data?.message as string) ||
          "An unexpected error occurred."
        );
      },
    }),

    deleteSupplierCategory: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["supplierCategory"],
      transformErrorResponse: (response: any) => {
        return (
          extractErrorMessage(response?.data?.message as string) ||
          "An unexpected error occurred."
        );
      },
    }),
  }),
});

export const {
  useGetAllSupplierCategoryQuery,
  useAddNewSupplierCategoryMutation,
  useUpdateSupplierCategoryMutation, // Export the new hook for updating supplier categories
  useDeleteSupplierCategoryMutation,
} = supplierCategoryApi;
