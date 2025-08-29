import { z } from "zod";

/**
 * Schema for creating a shop
 */
export const createShopSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Shop name must be at least 3 characters long"),
    description: z.string().optional(),
    address: z.string().min(5, "Address is required"),
    latitude: z.number({ invalid_type_error: "Latitude must be a number" }),
    longitude: z.number({ invalid_type_error: "Longitude must be a number" }),
  }),
});

/**
 * Schema for updating a shop
 */
export const updateShopSchema = z.object({
  params: z.object({
    shopId: z.string().uuid("Invalid shopId format"),
  }),
  body: z
    .object({
      name: z.string().min(3).optional(),
      description: z.string().optional(),
      address: z.string().min(5).optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .strict(),
});

/**
 * Schema for getting a shop by id
 */
export const getShopSchema = z.object({
  params: z.object({
    shopId: z.string().uuid("Invalid shopId format"),
  }),
});

/**
 * Schema for searching nearby shops
 */
export const searchNearbySchema = z.object({
  query: z.object({
    lat: z
      .string()
      .regex(/^-?\d+(\.\d+)?$/, "Latitude must be a valid number"),
    lng: z
      .string()
      .regex(/^-?\d+(\.\d+)?$/, "Longitude must be a valid number"),
    radius: z
      .string()
      .regex(/^\d+$/, "Radius must be a positive number")
      .optional(),
    keyword: z.string().optional(),
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
  }),
});
export const shopIdParamSchema = z.object({
  params: z.object({
    shopId: z.string().uuid("Invalid shopId format"),
  }),
});
export const myShopsSchema = z.object({});
export const myFavoritesSchema = z.object({});