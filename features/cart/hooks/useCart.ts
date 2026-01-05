import { useAppSelector } from "@/app/hooks";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "@/features/api/apiSlice";

export const useCart = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data, isLoading, isFetching, isUninitialized, error, isError } =
    useGetCartQuery(undefined, {
      skip: !isAuthenticated,
    });

  const items = data?.data.items ?? [];

  const [
    removeFromCart,
    {
      isLoading: isRemoving,
      isSuccess,
      isError: isErrorRemovingCart,
      error: errorRemoving,
    },
  ] = useRemoveFromCartMutation();

  const isBusy = isLoading || isFetching || isUninitialized;

  const handleRemoveItem = async (productId: string) => {
    await removeFromCart({ productId });
  };

  return {
    data,
    isBusy,
    items,
    handleRemoveItem,
    isRemoving,
    isSuccess,
  };
};
