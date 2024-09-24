import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StoreType } from "../_types/store_type";
import { getToken } from "../util/getToken";

const baseUrl = import.meta.env.VITE_API_URL;
export const storeApi = createApi({
    reducerPath: "storeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}store`,
        prepareHeaders: async (headers) => {
            const token = await getToken()
            if (token) {
                headers.set("Authorization", `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['store'],
    endpoints: (builder) => ({
        getAllstore: builder.query<StoreType[], void>({
            query: () => ({
                url: `/`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as StoreType[]) : ([] as StoreType[]),
            providesTags: ['store'],
        }),
        addNewstore: builder.mutation<void, Partial<StoreType>>({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ['store'],
            transformErrorResponse: (response: any) => {
                console.error(response);
                return {
                    message: response.data.message || 'An error occurred',
                    status: response.status
                };
            },
        }),
        deleteStore: builder.mutation({
            query: (id: number) => ({
                url: `/${id}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
            }),
            invalidatesTags: ['store'],
            // transformErrorResponse: (response: any) => {
            //   try {
            //     const message = response?.data?.message;
            //     return extractErrorMessage(message);
            //   } catch (error:any) {
            //     return 'An unexpected error occurred while processing your request.';
            //   }
            // },
        }),
    })
})

export const { useGetAllstoreQuery, useAddNewstoreMutation, useDeleteStoreMutation } = storeApi;
