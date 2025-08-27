import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { AppError } from "../../utils/http.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
} from "./auth.repository.js";
import { config } from "../../config/env.js";
import nodemailer from "nodemailer";
import { verifyOtpTemplate } from "../../utils/emailTemplates.js";
import { prisma } from "../../infra/prisma.js";
import { v4 as uuidv4 } from "uuid";
import geoip from "geoip-lite";
/** Utility: generate 6-digit OTP */
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
/** ======================
 * AUTH SERVICES
 * ====================== */
/** Register a new user */
export async function register(input: {
  name: string;
  email: string;
  password: string;
  role?: Role;
}) {
  const existing = await findUserByEmail(input.email);
  if (existing) throw new AppError("Email already in use", 409);
  const hash = await bcrypt.hash(input.password, config.bcryptRounds);
  const role: Role = input.role ?? "CUSTOMER";
  const otp = generateOtp();
  const user = await createUser({
    name: input.name,
    email: input.email,
    password: hash,
    role,
    otp,
    isVerified: false,
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: input.email,
    ...verifyOtpTemplate(input.name, otp),
  });
  return {
    email: user.email,
    message: "OTP sent to your email. Please verify.",
  };
}
/** Verify OTP */
export async function verifyOtp(email: string, otp: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new AppError("User not found", 404);
  if (user.isVerified) throw new AppError("User already verified", 400);
  if (user.otp !== otp) throw new AppError("Invalid OTP", 400);
  const updated = await updateUser(user.id, { isVerified: true, otp: null });
  const accessToken = signAccessToken({ sub: updated.id, role: updated.role });
  const refreshToken = signRefreshToken({
    sub: updated.id,
    role: updated.role,
  });
  await updateUser(updated.id, { refreshToken });
  return {
    accessToken,
    refreshToken,
    user: {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
    },
  };
}
export async function login(input: { email: string; password: string },
  ip?: string, userAgent?: string
) {
  const user = await findUserByEmail(input.email);
  if (!user) throw new AppError("Invalid credentials", 401);
  if (!user.isVerified)
    throw new AppError("Please verify your email first", 403);
  const ok = await bcrypt.compare(input.password, user.password);
  if (!ok) throw new AppError("Invalid credentials", 401);
  const accessToken = signAccessToken({ sub: user.id, role: user.role });
  const refreshToken = signRefreshToken({ sub: user.id, role: user.role });
  await updateUser(user.id, { refreshToken });

   const geo = ip ? geoip.lookup(ip) : null;
  const location = geo
    ? `${geo.city || "Unknown City"}, ${geo.region || ""} ${geo.country}`
    : null;

  const session = await prisma.session.create({
    data: {
      id: uuidv4(),
      userId: user.id,
      ip,
      userAgent,
      location,
      isCurrent: true,
    },
  });

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    session, 
  };
}
export async function me(userId: string) {
  const u = await findUserById(userId);
  if (!u) throw new AppError("User not found", 404);
  return u;
}
export async function refresh(tokenFromClient: string) {
  try {
    const payload = verifyRefreshToken(tokenFromClient);
    const user = await findUserById(payload.sub);
    if (!user || user.refreshToken !== tokenFromClient) {
      throw new AppError("Invalid refresh token", 403);
    }
    const newAccessToken = signAccessToken({ sub: user.id, role: user.role });
    const newRefreshToken = signRefreshToken({ sub: user.id, role: user.role });
    await updateUser(user.id, { refreshToken: newRefreshToken });
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch {
    throw new AppError("Invalid refresh token", 403);
  }
}
export async function changePassword(
  userId: string,
  oldPassword: string,
  newPassword: string
) {
  const user = await findUserById(userId);
  if (!user) throw new AppError("User not found", 404);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) throw new AppError("Old password is incorrect", 400);
  const hash = await bcrypt.hash(newPassword, config.bcryptRounds);
  await updateUser(userId, { password: hash });
  return { message: "Password changed successfully" };
}
export async function forgotPassword(email: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new AppError("User not found", 404);
  const otp = generateOtp();
  await updateUser(user.id, { otp });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    ...verifyOtpTemplate(user.name, otp),
  });
  return { message: "OTP sent to your email. Please verify." };
}
export async function resetPassword(
  email: string,
  otp: string,
  newPassword: string
) {
  const user = await findUserByEmail(email);
  if (!user) throw new AppError("User not found", 404);
  if (user.otp !== otp) throw new AppError("Invalid OTP", 400);
  const hash = await bcrypt.hash(newPassword, config.bcryptRounds);
  await updateUser(user.id, { password: hash, otp: null });
  return {
    message:
      "Password reset successful. You can now log in with your new password.",
  };
}
export async function resendOtp(email: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new AppError("User not found", 404);
  if (user.isVerified) throw new AppError("User already verified", 400);
  const otp = generateOtp();
  await updateUser(user.id, { otp });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    ...verifyOtpTemplate(user.name, otp),
  });
  return { message: "OTP resent to your email. Please verify." };
}
export async function logout(userId: string) {
  const user = await findUserById(userId);
  if (!user) throw new AppError("User not found", 404);
  await updateUser(userId, { refreshToken: null });
  return { message: "Logged out successfully" };
}
export async function checkAvailability(input: {
  email?: string;
  phone?: string;
}) {
  if (input.email) {
    const user = await findUserByEmail(input.email);
    if (user) throw new AppError("Email already in use", 409);
  }
  return { available: true };
}
export async function verify2FA(userId: string, code: string) {
  const user = await findUserById(userId);
  if (!user) throw new AppError("User not found", 404);
  if (!user.twoFASecret) {
    throw new AppError("2FA not enabled for this user", 400);
  }
  const verified = speakeasy.totp.verify({
    secret: user.twoFASecret,
    encoding: "base32",
    token: code,
    window: 1,
  });
  if (!verified) {
    throw new AppError("Invalid 2FA code", 400);
  }
  await updateUser(userId, { isTwoFAEnabled: true });
  return { message: "2FA verified successfully" };
}
export async function deleteAccount(userId: string) {
  const user = await findUserById(userId);
  if (!user) throw new AppError("User not found", 404);
  await prisma.user.delete({ where: { id: userId } });
  return { message: "Account deleted successfully" };
}
export async function listSessions(userId: string) {
  const user = await findUserById(userId);
  if (!user) throw new AppError("User not found", 404);

  return prisma.session.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}
export async function enable2FA(userId: string, method: string) {
  const user = await findUserById(userId);
  if (!user) throw new AppError("User not found", 404);
  if (method !== "TOTP") {
    throw new AppError("Only TOTP method is supported right now", 400);
  }
  const secret = speakeasy.generateSecret({
    name: `Hyperlocal (${user.email})`,
    length: 20,
  });
  const qrCodeDataURL = await qrcode.toDataURL(secret.otpauth_url!);
  await updateUser(userId, {
    twoFASecret: secret.base32,
    isTwoFAEnabled: false,
  });
  return {
    method,
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url,
    qrCode: qrCodeDataURL,
    message: "Scan this QR code in Google Authenticator and verify.",
  };
}
export async function revokeSession(userId: string, sessionId: string) {
  const user = await findUserById(userId);
  if (!user) throw new AppError("User not found", 404);
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });
   if (!session || session.userId !== userId) {
    throw new AppError("Session not found", 404);
  }
   await prisma.session.delete({
    where: { id: sessionId },
  });
  return { message: "Session revoked successfully" };
}
