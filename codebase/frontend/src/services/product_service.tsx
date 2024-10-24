import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType } from "../_types/product_type";
import extractErrorMessage from "../util/extractErrorMessage";
import { getToken } from "../util/getToken";

const baseUrl = import.meta.env.VITE_API_URL;

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}product`,
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    // Get all products
    getAllProducts: builder.query<ProductType[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) =>
        response.success
          ? (response.data as ProductType[])
          : ([] as ProductType[]),
      providesTags: ["product"],
    }),

    // Add new product
    addNewProduct: builder.mutation({
      query: ({ data }: { data: any }) => ({
        url: `/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["product"], // Refetch products after adding
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Failed to add product";
        return extractErrorMessage(message);
      },
    }),

    // Update product
    updateProduct: builder.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["product"], // Refetch products after updating
      transformErrorResponse: (response: any) => {
        console.log(response);
        const message = response?.data?.message || "Failed to update product";
        return extractErrorMessage(message);
      },
    }),

    // Delete product
    deleteProduct: builder.mutation({
      query: (id: number) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["product"], // Refetch products after deleting
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Failed to delete product";
        return extractErrorMessage(message);
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllProductsQuery,
  useAddNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
