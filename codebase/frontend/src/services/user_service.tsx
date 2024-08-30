// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../_types/user_type";
import extractErrorMessage from "../util/extractErrorMessage";
const baseUrl = import.meta.env.VITE_API_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}user` }),
  tagTypes: ['user'], // Define the tags
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
      providesTags: ['user'],
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

    // addUser: builder.mutation({
    //   query: (userData: UserType) => ({
    //     url: `/register`,
    //     method: "POST",
    //     body: userData,
    //     headers: {
    //       "Content-Type": "application/json",
    //       //   Authorization: "token",
    //     },
    //   }),
    // }),  /register



    addNewUser: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          // Authorization: "token",
        },
        body: data,
      }),
      invalidatesTags: ['user'], // Invalidate cache after mutation
      transformErrorResponse: (response: any) => {
        console.log(response);
        return extractErrorMessage(response.data.message as string);
      },
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
