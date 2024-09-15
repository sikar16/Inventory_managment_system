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

interface LoginDataType {
  email: string;
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
          // Authorization: "token",
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
          // Authorization: "token",
        },
      }),
    }),

    addNewuser: builder.mutation({
      query: (body: FormDataType) => ({
        url: `http://localhost:8888/api/user/register/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['user'],
      transformResponse: (response: Response) => {
        console.log(response);
        return response.success ? response.message : "something happened";
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
          // Authorization: "token",
        },
      }),
    }),

    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "token",
        },
      }),
      invalidatesTags: ['user'],
      // transformErrorResponse: (response: any) => {
      //   try {
      //     const message = response?.data?.message;
      //     return extractErrorMessage(message);
      //   } catch (error:any) {
      //     return 'An unexpected error occurred while processing your request.';
      //   }
      // },
    }),

    // Add the login mutation here

    loginUser: builder.mutation({
      query: (loginData: LoginDataType) => ({
        url: `http://localhost:8888/api/user/login`, // Adjust to your actual login API endpoint
        method: "POST",
        body: loginData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => {
        //   // You can handle storing token or response here
        //   if (response.success) {
        //     // Store token in localStorage
        //     localStorage.setItem('token', response.token);
        //     localStorage.setItem('role', response.role);
        //   }
        //   return response;
        console.log(response)
      },

      transformErrorResponse: (response) => {
        // const message = response?.data?.message || "Login failed";
        // return extractErrorMessage(message);
        console.log(response)
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
  useLoginUserMutation,
} = userApi;
