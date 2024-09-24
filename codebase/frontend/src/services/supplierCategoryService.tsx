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
            const token = await getToken()
            if (token) {
                headers.set("Authorization", `${token}`);
            }
            return headers;
        },
    }),
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
                response.success ? (response.data as supplierCategoryType[]) : ([] as supplierCategoryType[]),
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

        deleteSupplierCategory: builder.mutation({
            query: (id: number) => ({
                url: `/${id}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
            }),
            invalidatesTags: ['supplierCategory'],
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


export const { useGetAllsupplierCategoryQuery, useAddNewsupplierCategoryMutation, useDeleteSupplierCategoryMutation } = supplierCategoryApi