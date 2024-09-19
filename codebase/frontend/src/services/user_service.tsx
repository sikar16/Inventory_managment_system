// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../_types/user_type";
import extractErrorMessage from "../util/extractErrorMessage";
import { getToken } from "../util/getToken";
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
// Define the LoginResponse type based on your API's response structure
type LoginResponse = {
  success: boolean;
  token?: string; // Add optional fields based on your response
  role?: string;
  message?: string;
};

interface LoginDataType {
  email: string;
  password: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}user`,
    prepareHeaders: async (headers) => {
      const token = await getToken()
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
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
        url: `/register`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['user'],
      transformResponse: (response: any) => {
        console.log(response);
        return response.success ? response.message : "something happened";
      },
      transformErrorResponse: (response: any) => {
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

    // Define the mutation in your service
    loginUser: builder.mutation<LoginResponse, LoginDataType>({
      query: (loginData) => ({
        url: `http://localhost:8888/api/user/login`, // Adjust to your actual login API endpoint
        method: "POST",
        body: loginData,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer token" // Uncomment and adjust if using authorization tokens
        },
      }),
      transformResponse: (response: LoginResponse) => {
        return response;
      },
      transformErrorResponse: (response: any) => {
        return response.data;
      },
    })


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
