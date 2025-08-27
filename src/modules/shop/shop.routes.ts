import { Router } from "express";
import { auth, requireRole } from "../../middlewares/auth.js";

import {
  createShopCtrl,
  listShopsCtrl,
  getShopCtrl,
  updateShopCtrl,
  deleteShopCtrl,
} from "./shop.controller.js";

const router = Router();

// Only SELLER or ADMIN can create
router.post("/create-shop", auth(true), requireRole('SELLER','ADMIN'), createShopCtrl);

// Public: anyone can view
router.get("/list-shops",auth(true), listShopsCtrl);
router.get("/get-shop/:shopId",auth(true), getShopCtrl);

// Only SELLER or ADMIN can update/delete
router.put("/update-shop/:shopId", auth(true), requireRole('SELLER','ADMIN'), updateShopCtrl);
router.delete("/delete-shop/:shopId", auth(true), requireRole('SELLER','ADMIN'), deleteShopCtrl);

export default router;