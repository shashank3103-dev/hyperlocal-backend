import { Router } from "express";
import {
  loginCtrl,
  meCtrl,
  registerCtrl,
  verifyOtpCtrl,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  loginSchema,
  registerSchema,
  verifyOtpSchema,
} from "./auth.schemas.js";
import { auth } from "../../middlewares/auth.js";

const router = Router();

router.post("/register", validate(registerSchema), registerCtrl);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtpCtrl); // Assuming verifyOtpCtrl is similar to registerCtrl
router.post("/login", validate(loginSchema), loginCtrl);
router.get("/me", auth(true), meCtrl);

export default router;
