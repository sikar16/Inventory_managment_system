import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductSubCategoryType } from "../_types/productSubcategory_type";
const baseUrl = import.meta.env.VITE_API_URL;

export const productSubcategoryApi = createApi({
    reducerPath: "productSubcategoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}productSubCategory` }),
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

        })
    })
})

export const { useGetAllproductSubCategoryQuery } = productSubcategoryApi