import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../util/getToken";
import extractErrorMessage from "../util/extractErrorMessage";
import { PurchasedRequest_type } from "../_types/purchasedReq_type";

const baseUrl = import.meta.env.VITE_API_URL;

export const purchasedReqApi = createApi({
  reducerPath: "purchasedReqApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}purchasedReq`,
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["purchasedReq"],
  endpoints: (builder) => ({
    getAllpurchasedReq: builder.query<PurchasedRequest_type[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response.success
          ? (response.data as PurchasedRequest_type[])
          : [];
      },
      providesTags: ["purchasedReq"],
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error";
        return extractErrorMessage(message);
      },
    }),
    getSinglepurchasedReq: builder.query<PurchasedRequest_type, void>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response.data as PurchasedRequest_type;
      },

      providesTags: ["purchasedReq"],
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error";
        return extractErrorMessage(message);
      },
    }),

    addNewpurchasedReq: builder.mutation<void, PurchasedRequest_type>({
      query: (data) => ({
        url: `/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["purchasedReq"],
      transformErrorResponse: (response: any) => {
        console.log(response);
        const message = response?.data?.message || "Unknown error"; // Safely access the message
        return extractErrorMessage(message);
      },
    }),

    deletepurchasedReq: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`, // Ensure this matches your backend route
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Assuming token is required, it should already be attached in `prepareHeaders`
        },
      }),
      invalidatesTags: ["purchasedReq"], // This should trigger a refresh after deletion
      transformErrorResponse: (response: any) => {
        console.log("Delete error response: ", response);
        try {
          const message =
            response?.data?.message || "Error occurred while deleting";
          return extractErrorMessage(message);
        } catch (error) {
          console.error("Error in transformErrorResponse:", error);
          return "An unexpected error occurred while processing your request.";
        }
      },
    }),
  }),
});

export const { useAddNewpurchasedReqMutation, useGetSinglepurchasedReqQuery, useGetAllpurchasedReqQuery, useDeletepurchasedReqMutation } = purchasedReqApi;
