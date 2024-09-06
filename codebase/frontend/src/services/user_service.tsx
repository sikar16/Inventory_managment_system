// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../_types/user_type";
import extractErrorMessage from "../util/extractErrorMessage";
const baseUrl = import.meta.env.VITE_API_URL;
interface FormDataType {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  country: string;
  city: string;
  subCity: string;
  departmentId: number;
  password: string;
}
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

    addNewuser: builder.mutation({
      query: (body: FormDataType) => ({
        url: `http://localhost:8888/api/user/register/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['user'], // Invalidate 'userType' tag
      transformResponse: (response: Response) => {
        console.log(response);
        return response.success ? response.message : "something happend";
      },

      transformErrorResponse: (response: Response) => {
        const message = response?.data?.message;
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
      invalidatesTags: ['user'],
      transformErrorResponse: (response: any) => {
        try {
          const message = response?.data?.message;
          return extractErrorMessage(message);
        } catch (error) {
          return 'An unexpected error occurred while processing your request.';
        }
      },
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
