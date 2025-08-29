import { AppError } from "../../utils/http.js";
import {
  createShopRepo,
  listShopsRepo,
  findShopByIdRepo,
  updateShopRepo,
  deleteShopRepo,
  searchNearbyShopsRepo,
  listMyShopsRepo,
  approveShopRepo,
  rejectShopRepo,
  favoriteShopRepo,
  unfavoriteShopRepo,
  listMyFavoriteShopsRepo,
} from "./shop.repository.js";

export async function createShop(userId: string, input: any) {
  return createShopRepo(userId, input);
}

export async function listShops() {
  return listShopsRepo();
}

export async function getShopById(shopId: string) {
  const shop = await findShopByIdRepo(shopId);
  if (!shop) throw new AppError("Shop not found", 404);
  return shop;
}

export async function updateShop(shopId: string, userId: string, data: any) {
  if (!shopId) throw new AppError("shopId is required", 400);

  const shop = await findShopByIdRepo(shopId);
  if (!shop) throw new AppError("Shop not found", 404);
  if (shop.ownerId !== userId) throw new AppError("Not authorized", 403);

  return updateShopRepo(shopId, data);
}

export async function deleteShop(shopId: string, userId: string) {
  const shop = await findShopByIdRepo(shopId);
  if (!shop) throw new AppError("Shop not found", 404);
  if (shop.ownerId !== userId) throw new AppError("Not authorized", 403);

  return deleteShopRepo(shopId);
}

export async function searchNearbyShops(
  lat: number,
  lng: number,
  radiusKm?: number,
  keyword?: string,
  page?: number,
  limit?: number
) {
  return searchNearbyShopsRepo(lat, lng, radiusKm, keyword, page, limit);
}

export async function listMyShops(userId: string) {
  return listMyShopsRepo(userId);
}
export async function approveShop(shopId: string) {
  return approveShopRepo(shopId);
}
export async function rejectShop(shopId: string) {
  return rejectShopRepo(shopId);
}
export async function favoriteShop(userId: string, shopId: string) {
  return favoriteShopRepo(userId, shopId);
}

export async function unfavoriteShop(userId: string, shopId: string) {
  return unfavoriteShopRepo(userId, shopId);
}

export async function listMyFavoriteShops(userId: string) {
  return listMyFavoriteShopsRepo(userId);
}
