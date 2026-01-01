import { RootState } from "@/lib/store";
import type { Product, Products } from "@/types/product";
import type { GetCurrentUserResponse } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface GetProductsResponse {
  status: string;
  data: {
    products: Products;
  };
}

export type GetProductByIdResponse = {
  status: string;
  data: {
    product: Product;
  };
};

export interface SyncUserInput {
  token: string;
  profile?: {
    fullname?: string | null;
    photo?: string;
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
    syncUser: builder.mutation<GetCurrentUserResponse, SyncUserInput>({
      query: ({ token, profile }) => ({
        url: "/auth/sync",
        method: "POST",
        body: profile,
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

    getCart: builder.query({
      query: () => "/cart",
    }),
    addToCart: builder.mutation({
      query: ({ productId }) => ({
        url: "/cart",
        method: "POST",
        body: { productId },
      }),

      async onQueryStarted(
        { productId, product },
        { dispatch, queryFulfilled }
      ) {
        const patch = dispatch(
          apiSlice.util.updateQueryData("getCart", productId, (draft) => {
            //check if the cart exists in the cache
            const items = draft.data.cart.items;
            // if exists increament quantity by 1
            const item = items.map((item) => item.product._id === productId);

            if (item) item.product.quantity += 1;
            // if doesnot exists add the product to cache
            items.push({ product, quantity: 1 });
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useSyncUserMutation,
  useAddToCartMutation,
  useGetCartQuery,
} = apiSlice;
