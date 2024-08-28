import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StoreType } from "../_types/store_type";

const baseUrl = import.meta.env.VITE_API_URL;
export const storeApi = createApi({
    reducerPath: "storeApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}store` }),
    endpoints: (builder) => ({
        getAllstore: builder.query({
            query: () => ({
                url: `/`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as StoreType[]) : ([] as StoreType[]),

        })
    })
})


export const { useGetAllstoreQuery } = storeApi