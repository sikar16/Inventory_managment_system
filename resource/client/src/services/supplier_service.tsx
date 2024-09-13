import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import extractErrorMessage from "../util/extractErrorMessage";
import { SupplierType } from "../_types/supplier_type";
const baseUrl = import.meta.env.VITE_API_URL;


export const supplierApi = createApi({
    reducerPath: "supplierApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}supplier` }),
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
    }),
})
export const { useGetAllsupplierQuery, useAddNewsupplierMutation } = supplierApi;