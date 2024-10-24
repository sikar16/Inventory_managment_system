import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StoreType } from "../_types/store_type";
import { getToken } from "../util/getToken";

const baseUrl = import.meta.env.VITE_API_URL;

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}store`,
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["store"],
  endpoints: (builder) => ({
    getAllStores: builder.query<StoreType[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) =>
        response.success ? (response.data as StoreType[]) : ([] as StoreType[]),
      providesTags: ["store"],
    }),
    addNewStore: builder.mutation<void, Partial<StoreType>>({
      query: (data) => ({
        url: `/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["store"],
      transformErrorResponse: (response: any) => {
        console.error(response);
        return {
          message:
            response.data.message ||
            "An error occurred while adding a new store",
          status: response.status,
        };
      },
    }),
    deleteStore: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["store"],
      transformErrorResponse: (response: any) => {
        console.error(response);
        return {
          message:
            response.data.message ||
            "An error occurred while deleting the store",
          status: response.status,
        };
      },
    }),
    updateStore: builder.mutation({
      query: ({ body, params }: { body: any; params: { id: number } }) => ({
        url: `/${params.id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["store"],
      transformErrorResponse: (response: any) => {
        console.error(response);
        return {
          message:
            response.data.message ||
            "An error occurred while updating the store",
          status: response.status,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllStoresQuery,
  useAddNewStoreMutation,
  useDeleteStoreMutation,
  useUpdateStoreMutation,
} = storeApi;
