import { Product } from "@/types/cart";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000/api/v1" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),
  }),
});

export const { useGetAllProductsQuery } = apiSlice;
