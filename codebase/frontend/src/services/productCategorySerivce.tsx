import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductCategoryType } from "../_types/category_type";
const baseUrl = import.meta.env.VITE_API_URL;


export const productCategoryApi = createApi({
    reducerPath: "productCategoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8888/api/productCategory` }),
    endpoints: (builder) => ({
        getAllproductCategory: builder.query({
            query: () => ({
                url: `/`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    //   Authorization: "token",
                },
            }),
            transformResponse: (response: any) =>
                response.success ? (response.data as ProductCategoryType[]) : ([] as ProductCategoryType[]),
        }),
    }),
})
export const { useGetAllproductCategoryQuery } = productCategoryApi;