import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../util/getToken";
import extractErrorMessage from "../util/extractErrorMessage";
import { PurchasedOrderType } from "../_types/purchasedOrder_type";

const baseUrl = import.meta.env.VITE_API_URL;

export const purchasedOrderApi = createApi({
  reducerPath: "purchasedOrderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}purchasedOrder`,
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["purchasedOrder"],
  endpoints: (builder) => ({
    getAllpurchasedOrder: builder.query<PurchasedOrderType[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response.success
          ? (response.data as PurchasedOrderType[])
          : [];
      },
      providesTags: ["purchasedOrder"],
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error";
        return extractErrorMessage(message);
      },
    }),
    getSinglepurchasedOrder: builder.query<PurchasedOrderType, void>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response.data as PurchasedOrderType;
      },

      providesTags: ["purchasedOrder"],
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error";
        return extractErrorMessage(message);
      },
    }),

    addNewpurchasedOrder: builder.mutation<void, PurchasedOrderType>({
      query: (data) => ({
        url: `/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["purchasedOrder"],
      transformErrorResponse: (response: any) => {
        console.log(response);
        const message = response?.data?.message || "Unknown error"; // Safely access the message
        return extractErrorMessage(message);
      },
    }),

    deletepurchasedOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`, // Ensure this matches your backend route
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Assuming token is required, it should already be attached in `prepareHeaders`
        },
      }),
      invalidatesTags: ["purchasedOrder"], // This should trigger a refresh after deletion
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

export const { useAddNewpurchasedOrderMutation, useGetSinglepurchasedOrderQuery, useGetAllpurchasedOrderQuery, useDeletepurchasedOrderMutation } = purchasedOrderApi;
