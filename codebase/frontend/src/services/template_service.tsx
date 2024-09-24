import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TemplateType } from "../_types/template_type";
import extractErrorMessage from "../util/extractErrorMessage";
import { getToken } from "../util/getToken";


const baseUrl = import.meta.env.VITE_API_URL;
export const templateApi = createApi({
    reducerPath: "templateApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}temeplate`,
        prepareHeaders: async (headers) => {
            const token = await getToken()
            if (token) {
                headers.set("Authorization", `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['template'], // Define the tags
    endpoints: (builder) => ({
        getAlltemplate: builder.query({
            query: () => ({
                url: `/`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.date as TemplateType[]) : ([] as TemplateType[]),
            providesTags: ['template'],
        }),

        addNewtemplate: builder.mutation({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
                body: data,
            }),
            invalidatesTags: ['template'],
            transformErrorResponse: (response: any) => {
                console.log(response);
                return extractErrorMessage(response.data.message as string);
            },
        }),
        deleteTemplate: builder.mutation({
            query: (id: number) => ({
                url: `/${id}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
            }),
            invalidatesTags: ['template'],
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


export const { useGetAlltemplateQuery, useAddNewtemplateMutation, useDeleteTemplateMutation } = templateApi