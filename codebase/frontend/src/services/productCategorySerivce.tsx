import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductCategoryType } from "../_types/productCategory_type";
import extractErrorMessage from "../util/extractErrorMessage";
import { getToken } from "../util/getToken";

const baseUrl = import.meta.env.VITE_API_URL;
export interface AddCategoryType {
  name: string;
}

export const productCategoryApi = createApi({
  reducerPath: "productCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}productCategory`,
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ProductCategory"], // Ensures data is refetched when invalidated
  endpoints: (builder) => ({
    getAllProductCategory: builder.query<ProductCategoryType[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) =>
        response.success
          ? (response.data as ProductCategoryType[])
          : ([] as ProductCategoryType[]),
      providesTags: ["ProductCategory"], // Ensures refetching works correctly
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error"; // Safely access the message
        return extractErrorMessage(message);
      },
    }),

    getSingleProductCategory: builder.query<ProductCategoryType, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) =>
        response.success
          ? (response.data as ProductCategoryType)
          : ({} as ProductCategoryType),
      providesTags: (_result, _error, id) => [{ type: "ProductCategory", id }],
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error"; // Safely access the message
        return extractErrorMessage(message);
      },
    }),

    addNewProductCategory: builder.mutation<void, AddCategoryType>({
      query: (data) => ({
        url: `/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["ProductCategory"], // Ensures refetching after creation
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error"; // Safely access the message
        return extractErrorMessage(message);
      },
    }),

    updateProductCategory: builder.mutation({
      query: ({
        body: { name },
        params,
      }: {
        body: { name: string };
        params: number;
      }) => ({
        url: `/${params}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: { name },
      }),
      invalidatesTags: ["ProductCategory"], // Ensures refetching after update
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error"; // Safely access the message
        return extractErrorMessage(message);
      },
    }),

    deleteProductCategory: builder.mutation({
      query: ({ params }: { params: number }) => ({
        url: `/${params}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["ProductCategory"], // Ensures refetching after deletion
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error"; // Safely access the message
        return extractErrorMessage(message);
      },
    }),
  }),
});

export const {
  useGetAllProductCategoryQuery,
  useGetSingleProductCategoryQuery,
  useAddNewProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useDeleteProductCategoryMutation,
} = productCategoryApi;
