// productCategorySerivce.tsx

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductCategoryType } from "../_types/productCategory_type";
import extractErrorMessage from "../util/extractErrorMessage";

const baseUrl = import.meta.env.VITE_API_URL;

export const productCategoryApi = createApi({
    reducerPath: "productCategoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}productCategory`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
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
            transformResponse: (response: any) =>
                response.success ? (response.data as ProductCategoryType[]) : ([] as ProductCategoryType[]),
            providesTags: ['ProductCategory'],
            transformErrorResponse: (response: any) => {
                // console.log(response);
                const message = response?.data?.message || "Unknown error"; // Safely access the message
                return extractErrorMessage(message);
            },
        }),
        addNewProductCategory: builder.mutation<void, ProductCategoryType>({
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
        deleteProductCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ['ProductCategory'],
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error"; // Safely access the message
                return extractErrorMessage(message);
            },
        }),
    }),
});

export const { useGetAllproductCategoryQuery, useAddNewProductCategoryMutation, useDeleteProductCategoryMutation } = productCategoryApi;
