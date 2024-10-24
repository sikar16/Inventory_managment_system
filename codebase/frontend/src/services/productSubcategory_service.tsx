import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductSubCategoryType } from "../_types/productSubcategory_type";
import extractErrorMessage from "../util/extractErrorMessage";
import { getToken } from "../util/getToken";

const baseUrl = import.meta.env.VITE_API_URL;

export const productSubcategoryApi = createApi({
  reducerPath: "productSubcategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}productSubCategory`,
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["productSubCategory"],
  endpoints: (builder) => ({
    // Get all product subcategories
    getAllProductSubCategory: builder.query<ProductSubCategoryType[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) =>
        response.success
          ? (response.data as ProductSubCategoryType[])
          : ([] as ProductSubCategoryType[]),
      providesTags: ["productSubCategory"],
    }),

    // Add new product subcategory
    addNewProductSubCategory: builder.mutation({
      query: ({ data }: { data: { name: string; categoryId: number } }) => ({
        url: `/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["productSubCategory"], // Invalidate cache after mutation
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Failed to add subcategory";
        return extractErrorMessage(message);
      },
    }),

    // Update product subcategory
    updateProductSubCategory: builder.mutation({
      query: ({
        body,
        params,
      }: {
        body: {
          name: string;
          categoryId: number;
        };
        params: number;
      }) => ({
        url: `/${params}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["productSubCategory"], // Invalidate cache after mutation
      transformErrorResponse: (response: any) => {
        const message =
          response?.data?.message || "Failed to update subcategory";
        return extractErrorMessage(message);
      },
    }),

    // Delete product subcategory
    deleteProductSubCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["productSubCategory"], // Invalidate cache after deletion
      transformErrorResponse: (response: any) => {
        const message =
          response?.data?.message || "Failed to delete subcategory";
        return extractErrorMessage(message);
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllProductSubCategoryQuery,
  useAddNewProductSubCategoryMutation,
  useUpdateProductSubCategoryMutation,
  useDeleteProductSubCategoryMutation,
} = productSubcategoryApi;
