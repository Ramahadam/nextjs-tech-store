import { useAppSelector } from "@/app/hooks";
import {
  useAddToCartMutation,
  useClearCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
} from "@/features/api/apiSlice";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { CartItem } from "../cart.schema";
import { useCallback } from "react";

export const useCart = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data, isLoading, isFetching, isUninitialized } = useGetCartQuery(
    undefined,
    {
      skip: !isAuthenticated,
    }
  );
  const isBusy = isLoading || isFetching || isUninitialized;

  const items = data?.data.items ?? [];

  const [removeFromCart, { isLoading: isRemoving, isSuccess }] =
    useRemoveFromCartMutation();

  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  const [clearCart] = useClearCartMutation();

  const [updateCartQuantity, { isLoading: isUpdatingItemQty }] =
    useUpdateCartQuantityMutation();

  const addItem = useCallback(
    async (product: Product) => {
      try {
        await addToCart({ productId: product._id, product }).unwrap();

        toast.success("Successfully added to cart!", {
          position: "top-center",
          duration: 2000,
        });
      } catch {
        toast.error("Failed to add item", { position: "top-center" });
      }
    },
    [addToCart]
  );

  const removeItem = useCallback(
    async (productId: string) => {
      try {
        const { product }: CartItem = items.find(
          (item: CartItem) => item.product._id === productId
        );

        await removeFromCart({ productId });

        toast.success("Item successfully removed", {
          position: "top-center",
          duration: 2000,
          action: {
            label: "undo",
            onClick: () => {
              addItem(product);
            },
          },
        });
      } catch {
        toast.error("Failed to remove item", {
          position: "top-center",
          duration: 2000,
        });
      }
    },
    [items, addItem, removeFromCart]
  );

  return {
    data,
    isBusy,
    items,
    removeItem,
    isRemoving,
    isSuccess,
    isAdding,
    clearCart,
    addItem,
    updateCartQuantity,
    isUpdatingItemQty,
  };
};
