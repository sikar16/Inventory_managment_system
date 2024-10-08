import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import extractErrorMessage from "../util/extractErrorMessage";
import { SupplierType } from "../_types/supplier_type";
import { getToken } from "../util/getToken";
const baseUrl = import.meta.env.VITE_API_URL;


export const supplierApi = createApi({
    reducerPath: "supplierApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}supplier`,
        prepareHeaders: async (headers) => {
            const token = await getToken()
            if (token) {
                headers.set("Authorization", `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['supplier'], // Define the tags
    endpoints: (builder) => ({
        getAllsupplier: builder.query({
            query: () => ({
                url: `/`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    //   Authorization: "token",
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as SupplierType[]) : ([] as SupplierType[]),
            providesTags: ['supplier'], // Provide tags for this query

        }),
        addNewsupplier: builder.mutation({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
                body: data,
            }),
            invalidatesTags: ['supplier'], // Invalidate cache after mutation
            transformErrorResponse: (response: any) => {
                console.log(response);
                return extractErrorMessage(response.data.message as string);
            },
        }),
        deleteSupplier: builder.mutation({
            query: (id: number) => ({
                url: `/${id}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
            }),
            invalidatesTags: ['supplier'],
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
})
export const { useGetAllsupplierQuery, useAddNewsupplierMutation, useDeleteSupplierMutation } = supplierApi;