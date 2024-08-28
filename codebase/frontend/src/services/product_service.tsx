import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType } from "../_types/product_type";


const baseUrl = import.meta.env.VITE_API_URL;
export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}product` }),
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

        })
    })
})


export const { useGetAllproductQuery } = productApi