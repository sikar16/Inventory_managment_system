import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MaterialRequest_type } from "../_types/materialReq_type";
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
  tagTypes: ["MaterialReq"],
  endpoints: (builder) => ({
    getAllMaterialReq: builder.query<MaterialRequest_type[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response.success
          ? (response.data as MaterialRequest_type[])
          : [];
      },
      providesTags: ["MaterialReq"],
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error";
        return extractErrorMessage(message);
      },
    }),
    getAllMyMaterialReq: builder.query<MaterialRequest_type[], void>({
      query: () => ({
        url: `/my`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response.success
          ? (response.data as MaterialRequest_type[])
          : [];
      },
      providesTags: ["MaterialReq"],
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error";
        return extractErrorMessage(message);
      },
    }),
    getAllMaterialReqByDepartmentHead: builder.query<
      MaterialRequest_type[],
      void
    >({
      query: () => ({
        url: `/departmenthead`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response.success
          ? (response.data as MaterialRequest_type[])
          : [];
      },
      providesTags: ["MaterialReq"],
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error";
        return extractErrorMessage(message);
      },
    }),
    getAllMaterialReqByLs: builder.query<MaterialRequest_type[], void>({
      query: () => ({
        url: `/ls`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response.success
          ? (response.data as MaterialRequest_type[])
          : [];
      },
      providesTags: ["MaterialReq"],
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error";
        return extractErrorMessage(message);
      },
    }),

    getSingleMaterialReq: builder.query<MaterialRequest_type, void>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response.data as MaterialRequest_type;
      },

      providesTags: ["MaterialReq"],
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message || "Unknown error";
        return extractErrorMessage(message);
      },
    }),

    addNewMaterialReq: builder.mutation<
      void,
      {
        items: any;
      }
    >({
      query: (data) => ({
        url: `/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["MaterialReq"],
      transformErrorResponse: (response: any) => {
        console.log(response);
        const message = response?.data?.message || "Unknown error"; // Safely access the message
        return extractErrorMessage(message);
      },
    }),

    deleteMaterialReq: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`, // Ensure this matches your backend route
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Assuming token is required, it should already be attached in `prepareHeaders`
        },
      }),
      invalidatesTags: ["MaterialReq"], // This should trigger a refresh after deletion
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

    approveReq: builder.mutation({
      query: ({
        body,
        param,
      }: {
        body: { isApproviedByDH: boolean; logisticSuperViserId: number | null };
        param: number;
      }) => ({
        url: `/approve/${param}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["MaterialReq"],
      transformResponse: (response: any) => {
        console.log(response);
        return response.success ? response.message : "something happened";
      },
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message;
        return extractErrorMessage(message);
      },
    }),
  }),
});

export const {
  useGetAllMaterialReqQuery,
  useGetAllMyMaterialReqQuery,
  useGetAllMaterialReqByDepartmentHeadQuery,
  useGetAllMaterialReqByLsQuery,
  useAddNewMaterialReqMutation,
  useDeleteMaterialReqMutation,
  useGetSingleMaterialReqQuery,
  useApproveReqMutation,
} = materialReqApi;
