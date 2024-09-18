import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DepartmentType } from "../_types/department_type";
import { getToken } from "../util/getToken";

const baseUrl = import.meta.env.VITE_API_URL;
export const departmentApi = createApi({
    reducerPath: "departmentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}department`,
        prepareHeaders: async (headers) => {
            const token = await getToken()
            if (token) {
                headers.set("Authorization", `${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAlldepartment: builder.query({
            query: () => ({
                url: `/`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as DepartmentType[]) : ([] as DepartmentType[]),

        })
    })
})


export const { useGetAlldepartmentQuery } = departmentApi