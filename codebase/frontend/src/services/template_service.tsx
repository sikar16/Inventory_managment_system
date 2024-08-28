import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TemplateType } from "../_types/template_type";


const baseUrl = import.meta.env.VITE_API_URL;
export const templateApi = createApi({
    reducerPath: "templateApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}temeplate` }),
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

        })
    })
})


export const { useGetAlltemplateQuery } = templateApi