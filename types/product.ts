import { Review, reviewSchema } from "./review";
import { z } from "zod";

const laptopSchema = z.object({
  cpu: z.string(),
  ram: z.string(),
  screen: z.string(),
  storage: z.string(),
});

const desktopSchema = z.object({
  cpu: z.string(),
  ram: z.string(),
  storage: z.string(),
  powerSupply: z.string(),
  connectivity: z.array(z.string()),
  weight: z.string(),
});

const cctvSchema = z.object({
  connectivity: z.string(),
  nightVision: z.boolean(),
  resolution: z.string(),
});

type LpatopSpecs = z.infer<typeof laptopSchema>;

type DesktopSpecs = z.infer<typeof desktopSchema>;

type CCTVSpecs = z.infer<typeof cctvSchema>;

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  reviews: z.array(reviewSchema),
  stock: z.number(),
  images: z.array(z.string()),
  unitPrice: z.number(),
  quantity: z.number(),
  subTotal: z.number(),
  brand: z.string(),
  specs: z.union([laptopSchema, laptopSchema, laptopSchema]),
});

export type Product = z.infer<typeof productSchema>;

export type Products = Product[];
