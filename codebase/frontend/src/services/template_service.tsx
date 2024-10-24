import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import extractErrorMessage from "../util/extractErrorMessage";
import { getToken } from "../util/getToken";

export interface TemplateResponseType {
  id: number;
  name: string;
  createdAt: string; // ISO 8601 format
  attributes: Attribute[];
  _count: Count;
}
/**
 * Prepare headers for API requests by adding the Authorization header if the token is present
 * @param {Headers} headers - The headers to be prepared
 * @returns {Promise<Headers>} - The prepared headers
 */
interface Attribute {
  id: number;
  templateId: number;
  name: string;
  dataType: string;
}
interface Count {
  attributes: number;
}

const baseUrl = import.meta.env.VITE_API_URL;

export const templateApi = createApi({
  reducerPath: "templateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}template`,
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Template"], // Updated tag type for refetching
  endpoints: (builder) => ({
    getAllTemplates: builder.query<TemplateResponseType[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        const data = response.success
          ? (response.date as TemplateResponseType[])
          : ([] as TemplateResponseType[]);

        return data;
      },
      providesTags: ["Template"],
    }),

    getSingleTemplate: builder.query<TemplateResponseType, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) =>
        response.success
          ? (response.data as TemplateResponseType)
          : ({} as TemplateResponseType),
      providesTags: (_result, _error, id) => [{ type: "Template", id }],
    }),

    addNewTemplate: builder.mutation({
      query: (data) => ({
        url: `/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Template"], // Invalidates tags for refetching
      transformErrorResponse: (response: any) => {
        console.log(response);
        return extractErrorMessage(response.data.message as string);
      },
    }),

    updateTemplate: builder.mutation({
      query: ({
        id,
        data,
      }: {
        id: number;
        data: Partial<TemplateResponseType>;
      }) => ({
        url: `/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Template"], // Invalidates tags for refetching
      transformErrorResponse: (response: any) => {
        console.log(response);
        return extractErrorMessage(response.data.message as string);
      },
    }),

    deleteTemplate: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Template"], // Invalidates tags for refetching
      transformErrorResponse: (response: any) => {
        console.log(response);
        return extractErrorMessage(response.data.message as string);
      },
    }),
  }),
});

export const {
  useGetAllTemplatesQuery,
  useGetSingleTemplateQuery, // Export the single template hook
  useAddNewTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} = templateApi;
