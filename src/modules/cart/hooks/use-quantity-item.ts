import {Cart} from "#modules/cart/interfaces/cart.interface.ts";
import {CART_ENDPOINT} from "#src/config/endpoints.ts";
import {useMutation} from "#src/hooks/use-mutation-data.ts";

export const useQuantityItem = (productId: string, refetch: () => Promise<void>) => {
  const {callMutation: decrease} = useMutation<Cart>(CART_ENDPOINT.POST.decreaseProduct());
  const {callMutation: increase} = useMutation<Cart>(CART_ENDPOINT.POST.increaseProduct());
  const {callMutation: remove} = useMutation<Cart>(CART_ENDPOINT.DELETE.remove(), {
    method: "DELETE",
  });

  const onDecreaseItem = async () => {
    await decrease({params: {productId}});
    await refetch();
  };

  const onIncreaseItem = async () => {
    const response = await increase({params: {productId}});
    if (response.body.error) return;
    await refetch();
  };

  const onRemoveItem = async () => {
    await remove({params: {productId}});
    await refetch();
  };

  return {onDecreaseItem, onIncreaseItem, onRemoveItem};
};