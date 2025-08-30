import { Router } from "express";
import { auth, requireRole } from "../../middlewares/auth.js";

import {
  createShopCtrl,
  listShopsCtrl,
  getShopCtrl,
  updateShopCtrl,
  deleteShopCtrl,
  searchNearbyShopsCtrl,
  listMyShopsCtrl,
  approveShopCtrl,
  rejectShopCtrl,
  favoriteShopCtrl,
  listMyFavoriteShopsCtrl,
  unfavoriteShopCtrl,
} from "./shop.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  createShopSchema,
  getShopSchema,
  myFavoritesSchema,
  myShopsSchema,
  searchNearbySchema,
  shopIdParamSchema,
  updateShopSchema,
} from "./shop.schemas.js";

const router = Router();

router.post(
  "/create-shop",
  auth(true),
  requireRole("SELLER", "ADMIN"),
  validate(createShopSchema),
  createShopCtrl
);

router.get("/list-shops", auth(true), listShopsCtrl);
router.get(
  "/get-shop/:shopId",
  auth(true),
  validate(getShopSchema),
  getShopCtrl
);
router.get(
  "/search/nearby",
  validate(searchNearbySchema),
  searchNearbyShopsCtrl
);

router.put(
  "/update-shop/:shopId",
  auth(true),
  requireRole("SELLER", "ADMIN"),
  validate(updateShopSchema),
  updateShopCtrl
);
router.delete(
  "/delete-shop/:shopId",
  auth(true),
  requireRole("SELLER", "ADMIN"),
  validate(getShopSchema),
  deleteShopCtrl
);

router.get(
  "/my-shops",
  auth(true),
  requireRole("SELLER", "ADMIN"),
  validate(myShopsSchema),
  listMyShopsCtrl
);

// Admin routes
router.put(
  "/:shopId/approve",
  auth(true),
  requireRole("ADMIN"),
  // validate(shopIdParamSchema),
  approveShopCtrl
);
router.put(
  "/:shopId/reject",
  auth(true),
  requireRole("ADMIN"),
  validate(shopIdParamSchema),
  rejectShopCtrl
);

// Customer routes
router.post(
  "/:shopId/favorite",
  auth(true),
  requireRole("CUSTOMER", "SELLER", "ADMIN"),
  validate(shopIdParamSchema),
  favoriteShopCtrl
);
router.delete(
  "/:shopId/favorite",
  auth(true),
  requireRole("CUSTOMER", "SELLER", "ADMIN"),
  validate(shopIdParamSchema),
  unfavoriteShopCtrl
);
router.get(
  "/favorites/me",
  auth(true),
  requireRole("CUSTOMER", "SELLER", "ADMIN"),
  validate(myFavoritesSchema),
  listMyFavoriteShopsCtrl
);
export default router;
