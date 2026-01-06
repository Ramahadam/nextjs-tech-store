import { RootState } from "@/lib/store";
import type { Product, Products } from "@/types/product";
import type { GetCurrentUserResponse } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartItem, GetCartQueryResponse } from "../cart/cart.schema";

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
      transformResponse: (response) => ({
        ...response,
        data: {
          items: response.data?.items ?? [],
          totalPrice: response.data?.totalPrice ?? 0,
        },
      }),
    }),
    addToCart: builder.mutation<
      GetCartQueryResponse,
      { productId: string; product: Product }
    >({
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
          apiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            // if exists increament quantity by 1

            const existingItem = draft.data.items?.find(
              (item: CartItem) => item.product._id === productId
            );

            if (existingItem) {
              existingItem.quantity += 1;
              return;
            }
            // if doesnot exists add the product to cache
            draft.data.items.push({
              product,
              quantity: 1,
              unitPrice: product.unitPrice,
            });
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),

    updateCartQuantity: builder.mutation<
      CartItem,
      { productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `/cart/${productId}`,
        method: "PATCH",
        body: { quantity },
      }),
      async onQueryStarted(
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) {
        const patch = dispatch(
          apiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            const items = draft.data.items;

            const existingItem = items.find(
              (item: CartItem) => item.product._id === productId
            );
            //Remove item from cart if quanity <=0
            if (quantity <= 0) {
              draft.data.items = items.filter(
                (item: CartItem) => item.product._id !== productId
              );

              return;
            }

            if (existingItem) existingItem.quantity = quantity;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
    removeFromCart: builder.mutation<null, { productId: string }>({
      query: ({ productId }) => ({
        url: `/cart/${productId}`,
        method: "DELETE",
      }),

      async onQueryStarted({ productId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          apiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            if (!draft.data?.items) return;

            draft.data.items = draft.data.items.filter(
              (item: CartItem) => item.product._id !== productId
            );
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),

    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          apiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            draft.data.items = [];
            draft.totalPrice = 0;
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patch.undo();
          console.log(error);
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
  useRemoveFromCartMutation,
  useClearCartMutation,
  useUpdateCartQuantityMutation,
  useGetCartQuery,
} = apiSlice;
