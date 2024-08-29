import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StoreType } from "../_types/store_type";
import extractErrorMessage from "../util/extractErrorMessage";

const baseUrl = import.meta.env.VITE_API_URL;
export const storeApi = createApi({
    reducerPath: "storeApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}store` }),
    tagTypes: ['store'],
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
            providesTags: ['store'],

        }),
        addNewstore: builder.mutation({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
                body: data,
            }),
            invalidatesTags: ['store'], // Invalidate cache after mutation
            transformErrorResponse: (response: any) => {
                console.log(response);
                return extractErrorMessage(response.data.message as string);
            },
        }),

    })
})


export const { useGetAllstoreQuery, useAddNewstoreMutation } = storeApi