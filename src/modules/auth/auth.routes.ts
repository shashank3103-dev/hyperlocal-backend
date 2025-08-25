import { Router } from "express";
import {
  changePasswordCtrl,
  forgotPasswordCtrl,
  loginCtrl,
  logoutCtrl,
  meCtrl,
  refreshTokenCtrl,
  registerCtrl,
  resendOtpCtrl,
  resetPasswordCtrl,
  verifyOtpCtrl,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
  registerSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "./auth.schemas.js";
import { auth } from "../../middlewares/auth.js";

const router = Router();

// Public routes
router.post("/register", validate(registerSchema), registerCtrl);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtpCtrl);
router.post("/resend-otp", validate(verifyOtpSchema), resendOtpCtrl); // reuse verifyOtpSchema since it only needs email
router.post("/login", validate(loginSchema), loginCtrl);
router.post("/refresh-token", validate(refreshTokenSchema), refreshTokenCtrl);
router.post("/logout", validate(logoutSchema), logoutCtrl);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPasswordCtrl);
router.post("/reset-password", validate(resetPasswordSchema), resetPasswordCtrl);

// Protected routes
router.get("/me", auth(true), meCtrl);
router.post("/change-password", auth(true), validate(changePasswordSchema), changePasswordCtrl);


export default router;
