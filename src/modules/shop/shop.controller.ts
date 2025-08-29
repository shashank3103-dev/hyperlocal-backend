// modules/shop/shop.controller.ts
import { Request, Response, NextFunction } from "express";
import * as svc from "./shop.service.js";
import { ok } from "../../utils/http.js";

export const createShopCtrl = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data = await svc.createShop(req.user.sub, req.body);
    res.status(201).json(ok(data, "Shop created successfully"));
  } catch (err) {
    next(err);
  }
};

export const listShopsCtrl = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await svc.listShops();
    res.status(200).json(ok(data, "All shops listed"));
  } catch (err) {
    next(err);
  }
};

export const getShopCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await svc.getShopById(req.params.id);
    res.status(200).json(ok(data, "Shop details"));
  } catch (err) {
    next(err);
  }
};

export const updateShopCtrl = async (req: any, res: Response, next: NextFunction) => {
  try {
    const shopId = req.params.id;
    const data = await svc.updateShop(shopId, req.user.sub, req.body);
    res.status(200).json(ok(data, "Shop updated successfully"));
  } catch (err) {
    next(err);
  }
};

export const deleteShopCtrl = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data = await svc.deleteShop(req.params.id, req.user.sub);
    res.status(200).json(ok(data, "Shop deleted successfully"));
  } catch (err) {
    next(err);
  }
};
export const searchNearbyShopsCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lat, lng, radius, keyword, page, limit } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: "lat and lng are required" });
    }

    const data = await svc.searchNearbyShops(
      parseFloat(lat as string),
      parseFloat(lng as string),
      radius ? parseFloat(radius as string) : 5,
      keyword ? String(keyword) : "",
      page ? parseInt(page as string) : 1,
      limit ? parseInt(limit as string) : 10
    );

    res.status(200).json(ok(data, "Nearby shops listed"));
  } catch (err) {
    next(err);
  }
};

export const listMyShopsCtrl = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data = await svc.listMyShops(req.user.sub);
    res.status(200).json(ok(data, "My shops"));
  } catch (err) { next(err); }
};

export const approveShopCtrl = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data = await svc.approveShop(req.params.shopId);
    res.status(200).json(ok(data, "Shop approved"));
  } catch (err) { next(err); }
};

export const rejectShopCtrl = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data = await svc.rejectShop(req.params.shopId);
    res.status(200).json(ok(data, "Shop rejected"));
  } catch (err) { next(err); }
};

export const favoriteShopCtrl = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data = await svc.favoriteShop(req.user.sub, req.params.shopId);
    res.status(201).json(ok(data, "Shop favorited"));
  } catch (err) { next(err); }
};

export const unfavoriteShopCtrl = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data = await svc.unfavoriteShop(req.user.sub, req.params.shopId);
    res.status(200).json(ok(data, "Shop unfavorited"));
  } catch (err) { next(err); }
};

export const listMyFavoriteShopsCtrl = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data = await svc.listMyFavoriteShops(req.user.sub);
    res.status(200).json(ok(data, "My favorite shops"));
  } catch (err) { next(err); }
};