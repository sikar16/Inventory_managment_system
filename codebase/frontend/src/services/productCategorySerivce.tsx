// productCategorySerivce.tsx

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductCategoryType } from "../_types/productCategory_type";
import extractErrorMessage from "../util/extractErrorMessage";
import { getToken } from "../util/getToken";

const baseUrl = import.meta.env.VITE_API_URL;
export interface AddCategoryType {
    name: string
}

export const productCategoryApi = createApi({
    reducerPath: "productCategoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}productCategory`,
        prepareHeaders: async (headers) => {
            const token = await getToken()
            if (token) {
                headers.set("Authorization", `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['ProductCategory'],
    endpoints: (builder) => ({
        getAllproductCategory: builder.query<ProductCategoryType[], void>({
            query: () => ({
                url: `/`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            transformResponse: (response: any) => {
                console.log(response)
                return response.success ? (response.data as ProductCategoryType[]) : ([] as ProductCategoryType[])
            },
            providesTags: ['ProductCategory'],
            transformErrorResponse: (response: any) => {
                console.log(response)
                const message = response?.data?.message || "Unknown error"; // Safely access the message
                return extractErrorMessage(message);
            },
        }),
        addNewProductCategory: builder.mutation<void, AddCategoryType>({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ['ProductCategory'],
            transformErrorResponse: (response: any) => {
                console.log(response);
                const message = response?.data?.message || "Unknown error"; // Safely access the message
                return extractErrorMessage(message);
            },
        }),
        // deleteProductCategory: builder.mutation<void, string>({
        //     query: (id) => ({
        //         url: `/${id}`,  // Ensure this matches your backend route
        //         method: 'DELETE',
        //         headers: {
        //             "Content-Type": "application/json",
        //             // Assuming token is required, it should already be attached in `prepareHeaders`
        //         },
        //     }),
        //     invalidatesTags: ['ProductCategory'],  // This should trigger a refresh after deletion
        //     transformErrorResponse: (response: any) => {
        //         console.log("Delete error response: ", response);
        //         try {
        //             const message = response?.data?.message || "Error occurred while deleting";
        //             return extractErrorMessage(message);
        //         } catch (error) {
        //             console.error('Error in transformErrorResponse:', error);
        //             return 'An unexpected error occurred while processing your request.';
        //         }
        //     },
        // }),

        deleteProductCategory: builder.mutation({
            query: (id: number) => ({
                url: `/${id}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
            }),
            invalidatesTags: ['ProductCategory'],
            // transformErrorResponse: (response: any) => {
            //   try {
            //     const message = response?.data?.message;
            //     return extractErrorMessage(message);
            //   } catch (error:any) {
            //     return 'An unexpected error occurred while processing your request.';
            //   }
            // },
        }),

    }),
});

export const { useGetAllproductCategoryQuery, useAddNewProductCategoryMutation, useDeleteProductCategoryMutation } = productCategoryApi;
