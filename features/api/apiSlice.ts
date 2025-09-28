import { Product, Products } from "@/types/cart";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FetchedProducts {
  data: {
    products: Products;
  };
}

export const apiSlice = createApi({
  reducerPath: "techstoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3003/api/v1" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<FetchedProducts, void>({
      query: () => "products",
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = apiSlice;
