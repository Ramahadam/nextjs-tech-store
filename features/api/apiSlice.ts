import { RootState } from "@/lib/store";
import { Product, Products } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetProductsResponse {
  status: string;
  data: {
    products: Products;
  };
}

type GetProductByIdResponse = {
  status: string;
  data: {
    product: Product;
  };
};

interface UserProfile {
  data: {
    userId: string;
  };
}

export const apiSlice = createApi({
  reducerPath: "techstoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DEV_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    syncUser: builder.mutation({
      query: (token: string) => ({
        url: "/auth/sync",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAllProducts: builder.query<GetProductsResponse, void>({
      query: () => "products",
    }),
    getProductById: builder.query<GetProductByIdResponse, string>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useSyncUserMutation,
} = apiSlice;
