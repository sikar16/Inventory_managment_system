// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../_types/user_type";
import extractErrorMessage from "../util/extractErrorMessage";
const baseUrl = import.meta.env.VITE_API_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}user` }),
  tagTypes: ['user'],
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

    addNewuser: builder.mutation<UserType, Partial<UserType>>({
      query: (body) => ({
        url: `http://localhost:8888/api/user/register`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['user'], // Invalidate 'userType' tag

      transformErrorResponse: (response: any) => {
        console.log(response);
        const message = response?.data?.message || 'Unknown error';
        return extractErrorMessage(message);
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
  useAddNewuserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
