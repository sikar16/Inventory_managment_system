import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../util/getToken";
import extractErrorMessage from "../util/extractErrorMessage";
import { SupplierOffer } from "../_types/supplierOffer_type";

const baseUrl = import.meta.env.VITE_API_URL;

export const supplierOfferApi = createApi({
  reducerPath: "supplierOfferApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}supplierOffer`,
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["supplierOfferApi"],
  endpoints: (builder) => ({
    getAllsupplierOfferApi: builder.query<SupplierOffer[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response.success
          ? (response.data as SupplierOffer[])
          : [];
      },
      providesTags: ["supplierOfferApi"],
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error";
        return extractErrorMessage(message);
      },
    }),
    getSinglesupplierOfferApi: builder.query<SupplierOffer, void>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response.data as SupplierOffer;
      },

      providesTags: ["supplierOfferApi"],
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error";
        return extractErrorMessage(message);
      },
    }),

    addNewsupplierOfferApi: builder.mutation<void, SupplierOffer>({
      query: (data) => ({
        url: `/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["supplierOfferApi"],
      transformErrorResponse: (response: any) => {
        console.log(response);
        const message = response?.data?.message || "Unknown error"; // Safely access the message
        return extractErrorMessage(message);
      },
    }),

    deletesupplierOfferApi: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`, // Ensure this matches your backend route
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Assuming token is required, it should already be attached in `prepareHeaders`
        },
      }),
      invalidatesTags: ["supplierOfferApi"], // This should trigger a refresh after deletion
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

// export const {
//   useGetAllsupplierOfferApiQuery,
//   useAddNewsupplierOfferApiMutation,
//   useDeletesupplierOfferApiMutation,
//   useGetSinglesupplierOfferApiQuery,
// } = supplierOfferApi;


export const { useGetAllsupplierOfferApiQuery, useGetSinglesupplierOfferApiQuery, useAddNewsupplierOfferApiMutation, useDeletesupplierOfferApiMutation } = supplierOfferApi