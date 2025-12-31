import { z } from "zod";

export const reviewSchema = z.object({
  id: z.string(),
  product: z.string(),
  user: z.union([z.string()]),
  rating: z.number(),
  review: z.string(),
});

export type Review = z.infer<typeof reviewSchema>;
