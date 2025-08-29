import { prisma } from "../../infra/prisma.js";
import { Shop } from "@prisma/client";

export async function createShopRepo(
  userId: string,
  input: {
    name: string;
    description?: string;
    address: string;
    latitude: number;
    longitude: number;
  }
): Promise<Shop> {
  return prisma.shop.create({
    data: {
      ...input,
      ownerId: userId,
    },
  });
}

export async function listShopsRepo() {
  return prisma.shop.findMany({
    include: { owner: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function findShopByIdRepo(shopId: string) {
  return prisma.shop.findUnique({ where: { id: shopId } });
}

export async function updateShopRepo(shopId: string, data: Partial<Shop>) {
  return prisma.shop.update({
    where: { id: shopId },
    data: { status: "APPROVED" }
  });
}

export async function deleteShopRepo(shopId: string) {
  return prisma.shop.delete({ where: { id: shopId } });
}

export async function searchNearbyShopsRepo(
  lat: number,
  lng: number,
  radiusKm = 5,
  keyword = "",
  page = 1,
  limit = 10
) {
  const radiusMeters = radiusKm * 1000;
  const offset = (page - 1) * limit;

  return prisma.$queryRawUnsafe<any[]>(`
    SELECT s.id, s."name", s.description, s.address,
           s."latitude", s."longitude",
           ST_Distance(
             ST_SetSRID(ST_MakePoint(s."longitude", s."latitude"),4326)::geography,
             ST_SetSRID(ST_MakePoint(${lng}, ${lat}),4326)::geography
           ) / 1000 AS distance_km
    FROM "Shop" s
    WHERE s."name" ILIKE '%${keyword}%'
    AND ST_DWithin(
          ST_SetSRID(ST_MakePoint(s."longitude", s."latitude"),4326)::geography,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}),4326)::geography,
          ${radiusMeters}
        )
    ORDER BY distance_km ASC
    LIMIT ${limit} OFFSET ${offset};
  `);
}
/**
 * List shops owned by a specific seller/admin user.
 */
export async function listMyShopsRepo(userId: string) {
  return prisma.shop.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Approve shop (admin only).
 */
export async function approveShopRepo(shopId: string) {
  return prisma.shop.update({
    where: { id: shopId },
    data: { status: "APPROVED" },
  });
}

/**
 * Reject shop (admin only).
 */
export async function rejectShopRepo(shopId: string) {
  return prisma.shop.update({
    where: { id: shopId },
    data: { status: "REJECTED" },
  });
}

/**
 * Mark shop as favorited by a customer.
 */
export async function favoriteShopRepo(userId: string, shopId: string) {
  return prisma.shopFavorite.create({
    data: { userId, shopId },
  });
}

/**
 * Remove shop from customer favorites.
 */
export async function unfavoriteShopRepo(userId: string, shopId: string) {
  return prisma.shopFavorite.delete({
    where: { shopId_userId: { shopId, userId } },
  });
}

/**
 * List all shops a user has favorited.
 */
export async function listMyFavoriteShopsRepo(userId: string) {
  return prisma.shopFavorite.findMany({
    where: { userId },
    include: { shop: true },
  });
}

