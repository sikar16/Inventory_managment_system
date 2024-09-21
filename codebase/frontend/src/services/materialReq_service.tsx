import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MaterialRequestType } from "../_types/matreialReq_type";
import { getToken } from "../util/getToken";
import extractErrorMessage from "../util/extractErrorMessage";

const baseUrl = import.meta.env.VITE_API_URL;

export const materialReqApi = createApi({
    reducerPath: "materialReqApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}materialReq`,
        prepareHeaders: async (headers) => {
            const token = await getToken();
            if (token) {
                headers.set("Authorization", `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['MaterialReq'],
    endpoints: (builder) => ({
        getAllMaterialReq: builder.query<MaterialRequestType[], void>({
            query: () => ({
                url: `/`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            transformResponse: (response: any) => {
                return response.success ? (response.data as MaterialRequestType[]) : [];
            },
            providesTags: ['MaterialReq'],
            transformErrorResponse: (response: any) => {
                const message = response?.data?.message || "Unknown error";
                return extractErrorMessage(message);
            },
        }),

        addNewMaterialReq: builder.mutation<void, MaterialRequestType>({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ['MaterialReq'],
            transformErrorResponse: (response: any) => {
                console.log(response);
                const message = response?.data?.message || "Unknown error"; // Safely access the message
                return extractErrorMessage(message);
            },
        }),
    }),
});

export const { useGetAllMaterialReqQuery, useAddNewMaterialReqMutation } = materialReqApi;
