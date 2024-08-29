import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType } from "../_types/product_type";
import extractErrorMessage from "../util/extractErrorMessage";


const baseUrl = import.meta.env.VITE_API_URL;
export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}product` }),
    tagTypes: ['product'],
    endpoints: (builder) => ({
        getAllproduct: builder.query({
            query: () => ({
                url: `/`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as ProductType[]) : ([] as ProductType[]),
            providesTags: ['product'],

        }),
        addNewProduct: builder.mutation({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
                body: data,
            }),
            invalidatesTags: ['product'], // Invalidate cache after mutation
            transformErrorResponse: (response: any) => {
                console.log(response);
                return extractErrorMessage(response.data.message as string);
            },
        }),
    })
})


export const { useGetAllproductQuery, useAddNewProductMutation } = productApi