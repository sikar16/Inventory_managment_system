// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../_types/user_type";
const baseUrl = import.meta.env.VITE_API_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/user` }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: "token",
        },
      }),
      transformResponse: (response: any) =>
        response.success ? (response.data as UserType[]) : ([] as UserType[]),
    }),

    getSingleUser: builder.query({
      query: (id: number) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: "token",
        },
      }),
    }),

    addUser: builder.mutation({
      query: (userData: UserType) => ({
        url: `/register`,
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: "token",
        },
      }),
    }),

    updateUser: builder.mutation({
      query: (userData: UserType) => ({
        url: `/${userData.id}`,
        method: "PUT",
        body: userData,
        headers: {
          "Content-Type": "application/json",
          //   Authorization: "token",
        },
      }),
    }),

    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: "token",
        },
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
