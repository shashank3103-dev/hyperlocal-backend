import { prisma } from "../../infra/prisma.js";
import { AppError } from "../../utils/http.js";

export async function createShop(userId: string, input: {
  name: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
}) {
  return prisma.shop.create({
    data: {
      ...input,
      ownerId: userId,
    },
  });
}

export async function listShops() {
  return prisma.shop.findMany({
    include: { owner: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getShopById(shopId: string) {
  const shop = await prisma.shop.findUnique({ where: { id: shopId } });
  if (!shop) throw new AppError("Shop not found", 404);
  return shop;
}

export async function updateShop(shopId: string, userId: string, data: Partial<{
  name: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
}>) {
  const shop = await prisma.shop.findUnique({ where: { id: shopId } });
  if (!shop || shop.ownerId !== userId) throw new AppError("Not authorized", 403);

  return prisma.shop.update({
    where: { id: shopId },
    data,
  });
}

export async function deleteShop(shopId: string, userId: string) {
  const shop = await prisma.shop.findUnique({ where: { id: shopId } });
  if (!shop || shop.ownerId !== userId) throw new AppError("Not authorized", 403);

  await prisma.shop.delete({ where: { id: shopId } });
  return { message: "Shop deleted successfully" };
}