import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import shopRoutes from "../modules/shop/shop.routes.js";

const router = Router();

// All routes go here
router.use("/auth", authRoutes);
router.use("/shops", shopRoutes); // Assuming you have shopRoutes defined similarly

export default router;
