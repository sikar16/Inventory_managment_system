import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SupplierCategoryType } from "../_types/supplierCategory_type";
import extractErrorMessage from "../util/extractErrorMessage";
const baseUrl = import.meta.env.VITE_API_URL;
export const supplierCategoryApi = createApi({
    reducerPath: "supplierCategoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}supplierCategory` }),
    tagTypes: ['supplierCategory'],
    endpoints: (builder) => ({
        getAllsupplierCategory: builder.query({
            query: () => ({
                url: `/`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as SupplierCategoryType[]) : ([] as SupplierCategoryType[]),
            providesTags: ['supplierCategory'],

        }),

        addNewsupplierCategory: builder.mutation({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
                body: data,
            }),
            invalidatesTags: ['supplierCategory'], // Invalidate cache after mutation
            transformErrorResponse: (response: any) => {
                console.log(response);
                return extractErrorMessage(response.data.message as string);
            },
        }),

    }),
});


export const { useGetAllsupplierCategoryQuery, useAddNewsupplierCategoryMutation } = supplierCategoryApi