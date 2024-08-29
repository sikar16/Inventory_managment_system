import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductCategoryType } from "../_types/productCategory_type";
import extractErrorMessage from "../util/extractErrorMessage";

const baseUrl = import.meta.env.VITE_API_URL;

export const productCategoryApi = createApi({
    reducerPath: "productCategoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}productCategory` }),
    tagTypes: ['ProductCategory'], // Define the tags
    endpoints: (builder) => ({
        getAllproductCategory: builder.query({
            query: () => ({
                url: `/`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.date as ProductCategoryType[]) : ([] as ProductCategoryType[]),
            providesTags: ['ProductCategory'], // Provide tags for this query
        }),
        addNewProductCategory: builder.mutation({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
                body: data,
            }),
            invalidatesTags: ['ProductCategory'], // Invalidate cache after mutation
            transformErrorResponse: (response: any) => {
                console.log(response);
                return extractErrorMessage(response.data.message as string);
            },
        }),
        deleteProductCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
            }),
            invalidatesTags: ['ProductCategory'], // Invalidate cache after mutation
            transformErrorResponse: (response: any) => {
                // Safely handle the error response
                const message = response?.data?.message;
                return extractErrorMessage(message);
            },
        }),
    }),
});

export const { useGetAllproductCategoryQuery, useAddNewProductCategoryMutation, useDeleteProductCategoryMutation } = productCategoryApi;
