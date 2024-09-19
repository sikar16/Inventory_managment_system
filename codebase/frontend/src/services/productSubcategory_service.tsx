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
            const token = await getToken()
            if (token) {
                headers.set("Authorization", `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['productSubCategory'],
    endpoints: (builder) => ({
        getAllproductSubCategory: builder.query({
            query: () => ({
                url: `/`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as ProductSubCategoryType[]) : ([] as ProductSubCategoryType[]),
            providesTags: ['productSubCategory'],
        }),
        addNewProductSubCategory: builder.mutation({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
                body: data,
            }),
            invalidatesTags: ['productSubCategory'], // Invalidate cache after mutation
            transformErrorResponse: (response: any) => {
                console.log(response);
                return extractErrorMessage(response.data.message as string);
            },
        }),
        deleteProductSubCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ['productSubCategory'],
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error"; // Safely access the message
                return extractErrorMessage(message);
            },
        }),
    })
})

export const { useGetAllproductSubCategoryQuery, useAddNewProductSubCategoryMutation, useDeleteProductSubCategoryMutation } = productSubcategoryApi