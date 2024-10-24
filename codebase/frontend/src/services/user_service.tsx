// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MeUserType, UserType } from "../_types/user_type";
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
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserType[], void>({
      query: () => `/`,
      transformResponse: (response: any) =>
        response.success ? (response.data as UserType[]) : ([] as UserType[]),
      providesTags: ["user"],
    }),

    getMy: builder.query<MeUserType | null, void>({
      query: () => `/get-me`,
      transformResponse: (response: any) =>
        response.success ? (response.data as MeUserType) : null,
      providesTags: ["user"],
    }),

    getSingleUser: builder.query<UserType, number>({
      query: (id: number) => `/${id}`,
    }),

    addNewUser: builder.mutation<string, FormDataType>({
      query: (body: FormDataType) => ({
        url: `/register`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"], // Invalidate user tags to refetch
      transformResponse: (response: any) => {
        console.log(response);
        return response.success ? response.message : "something happened";
      },
      transformErrorResponse: (response: any) => {
        console.log(response);
        const message = response?.data?.message;
        return extractErrorMessage(message);
      },
    }),

    assignRole: builder.mutation<
      string,
      { body: { role: string }; param: number }
    >({
      query: ({ body, param }) => ({
        url: `/assignRole/${param}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user"], // Invalidate user tags to refetch
      transformResponse: (response: any) => {
        return response.success ? response.message : "something happened";
      },
      transformErrorResponse: (response: any) => {
        const message = response?.data?.message;
        return extractErrorMessage(message);
      },
    }),

    updateUser: builder.mutation<void, UserType>({
      query: (userData: UserType) => ({
        url: `/${userData.id}`,
        method: "PUT",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["user"], // Invalidate user tags to refetch
    }),

    deleteUser: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["user"], // Invalidate user tags to refetch
    }),

    loginUser: builder.mutation<LoginResponse, LoginDataType>({
      query: (loginData) => ({
        url: `http://localhost:8888/api/user/login`, // Adjust to your actual login API endpoint
        method: "POST",
        body: loginData,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token", // Uncomment and adjust if using authorization tokens
        },
      }),
      transformResponse: (response: LoginResponse) => {
        return response;
      },
      transformErrorResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginUserMutation,
  useAssignRoleMutation,
  useGetMyQuery,
} = userApi;
