import { RootState } from "@/lib/store";
import { CartIem } from "@/types/cart";
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
            //check if the cart exists in the cache
            if (!draft.data?.items) {
              // Since cart is not exist we create the draft to be similar to cache later we push new product and add quanity
              draft.data = { items: [], totalPrice: 0 };
            }
            // if exists increament quantity by 1

            const existingItem = draft.data.items?.find(
              (item: CartItem) => item.product._id === productId
            );

            if (existingItem) {
              existingItem.quantity += 1;
              existingItem.unitPrice = product.unitPrice;

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
    removeFromCart: builder.mutation<null, { productId: string }>({
      query: ({ productId }) => ({
        url: "/cart",
        method: "DELETE",
        body: { productId },
      }),

      async onQueryStarted({ productId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          apiSlice.util.updateQueryData("getCart", undefined, (draft) => {
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

    updateCartQuantity: builder.mutation<
      CartIem,
      { productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: "/cart",
        method: "patch",
        body: { productId, quantity },
      }),
      async onQueryStarted(
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) {
        const patch = dispatch(
          apiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            const items = draft.data.cart.items;

            const existingItem = items.find(
              (item: CartItem) => item.product._id === productId
            );

            if (existingItem.quantity <= 0) {
              draft.data.cart.items = items.filter(
                (item: CartItem) => item.product._id === productId
              );
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
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useSyncUserMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
  useGetCartQuery,
} = apiSlice;
