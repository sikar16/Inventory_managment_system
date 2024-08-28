import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supplierCategoryType } from "../_types/supplierCategory_type";
const baseUrl = import.meta.env.VITE_API_URL;
export const supplierCategoryApi = createApi({
    reducerPath: "supplierCategoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}supplierCategory` }),
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
        }),
    }),
});


export const { useGetAllsupplierCategoryQuery } = supplierCategoryApi