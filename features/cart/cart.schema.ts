import { productSchema } from "@/types/product";
import { z } from "zod";

const cartItemSchema = z.object({
  product: productSchema,
  quantity: z.number().min(1),
  unitPrice: z.number().min(1),
});

const cartSchema = z.object({
  totalPrice: z.number(),
  items: z.array(cartItemSchema),
});

export const getCartQueryResponseSchema = z.object({
  status: z.string(),
  data: cartSchema,
});

export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type GetCartQueryResponse = z.infer<typeof getCartQueryResponseSchema>;
