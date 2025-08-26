import { Router } from "express";
import {
  changePasswordCtrl,
  checkAvailabilityCtrl,
  deleteAccountCtrl,
  enable2FACtrl,
  forgotPasswordCtrl,
  // googleLoginCtrl,
  listSessionsCtrl,
  loginCtrl,
  logoutCtrl,
  meCtrl,
  refreshTokenCtrl,
  registerCtrl,
  resendOtpCtrl,
  resetPasswordCtrl,
  revokeSessionCtrl,
  verify2FACtrl,
  verifyOtpCtrl,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  availabilitySchema,
  changePasswordSchema,
  enable2FASchema,
  forgotPasswordSchema,
  googleLoginSchema,
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
  registerSchema,
  resetPasswordSchema,
  revokeSessionSchema,
  verify2FASchema,
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

// Social login
// router.post("/google-login", validate(googleLoginSchema), googleLoginCtrl);

// Availability check
router.post("/check-availability", validate(availabilitySchema), checkAvailabilityCtrl);

// Session management
router.get("/sessions", auth(true), listSessionsCtrl);
router.post("/revoke-session", auth(true), validate(revokeSessionSchema), revokeSessionCtrl);

// Two-Factor Authentication (2FA)
router.post("/enable-2fa", auth(true),  enable2FACtrl);
router.post("/verify-2fa",auth(true), verify2FACtrl);

// Account deletion
router.delete("/delete-account", auth(true), deleteAccountCtrl);
export default router;
