import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DepartmentType } from "../_types/department_type";
const baseUrl = import.meta.env.VITE_API_URL;


export const supplierApi = createApi({
    reducerPath: "supplierApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/supplier` }),
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
                response.success ? (response.data as DepartmentType[]) : ([] as DepartmentType[]),
        }),
    }),
})
export const { useGetAllsupplierQuery } = supplierApi;