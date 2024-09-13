import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductSubCategoryType } from "../_types/productSubcategory_type";
import extractErrorMessage from "../util/extractErrorMessage";
const baseUrl = import.meta.env.VITE_API_URL;

export const productSubcategoryApi = createApi({
    reducerPath: "productSubcategoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}productSubCategory` }),
    tagTypes: ['productSubCategory'],
    endpoints: (builder) => ({
        getAllproductSubCategory: builder.query({
            query: () => ({
                url: `/`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as ProductSubCategoryType[]) : ([] as ProductSubCategoryType[]),
            providesTags: ['productSubCategory'],
        }),
        addNewProductSubCategory: builder.mutation({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: "token",
                },
                body: data,
            }),
            invalidatesTags: ['productSubCategory'], // Invalidate cache after mutation
            transformErrorResponse: (response: any) => {
                console.log(response);
                return extractErrorMessage(response.data.message as string);
            },
        }),
    })
})

export const { useGetAllproductSubCategoryQuery, useAddNewProductSubCategoryMutation } = productSubcategoryApi