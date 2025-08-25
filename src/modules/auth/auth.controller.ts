import { Request, Response, NextFunction } from "express";
import * as svc from "./auth.service.js";
import { ok } from "../../utils/http.js";

export const registerCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await svc.register(req.body);
    res.status(201).json(ok(data, "OTP sent to your email. Please verify."));
  } catch (err) {
    next(err);
  }
};

export const verifyOtpCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;
    const data = await svc.verifyOtp(email, otp);
    res.status(200).json(
      ok(
        // data,
        "Email verified successfully. You can now log in."
      )
    );
  } catch (err) {
    next(err);
  }
};

export const loginCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await svc.login(req.body);
    res.status(200).json(ok(data, "Login successful"));
  } catch (err) {
    next(err);
  }
};

export const meCtrl = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data = await svc.me(req.user.sub);
    res.status(200).json(ok(data, "User profile"));
  } catch (err) {
    next(err);
  }
};

export const refreshTokenCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const data = await svc.refreshToken(refreshToken);
    res.status(200).json(ok(data, "Token refreshed"));
  } catch (err) {
    next(err);
  }
};
export const logoutCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    await svc.logout(refreshToken);
    res.status(200).json(ok(null, "Logged out successfully"));
  } catch (err) {
    next(err);
  }
};
export const forgotPasswordCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    await svc.forgotPassword(email);
    res
      .status(200)
      .json(ok(null, "OTP sent to your email. Please verify."));
  } catch (err) {
    next(err);
  }
};
export const resetPasswordCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp, newPassword } = req.body;
    await svc.resetPassword(email, otp, newPassword);
    res.status(200).json(ok(null, "Password reset successful. You can now log in with your new password."));
  } catch (err) {
    next(err);
  }
};
export const changePasswordCtrl = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.sub;
    const { currentPassword, newPassword } = req.body;
    await svc.changePassword(userId, currentPassword, newPassword);
    res.status(200).json(ok(null, "Password changed successfully"));
  } catch (err) {
    next(err);
  }
};
export const resendOtpCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    await svc.resendOtp(email);
    res.status(200).json(ok(null, "OTP resent to your email. Please verify."));
  } catch (err) {
    next(err);
  }
};

