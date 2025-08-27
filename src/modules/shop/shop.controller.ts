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
    const data = await svc.updateShop(req.params.id, req.user.sub, req.body);
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