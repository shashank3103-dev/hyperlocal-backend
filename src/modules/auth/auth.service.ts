import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AppError } from "../../utils/http.js";
import { signJwt } from "../../utils/jwt.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
} from "./auth.repository.js";
import { config } from "../../config/env.js";
import nodemailer from "nodemailer";
import { verifyOtpTemplate } from "../../utils/emailTemplates.js";




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

  const token = signJwt({ sub: updated.id, role: updated.role });

  return {
    token,
    user: {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
    },
  };
}

export async function login(input: { email: string; password: string }) {
  const user = await findUserByEmail(input.email);
  if (!user) throw new AppError("Invalid credentials", 401);
  if (!user.isVerified)
    throw new AppError("Please verify your email first", 403);

  const ok = await bcrypt.compare(input.password, user.password);
  if (!ok) throw new AppError("Invalid credentials", 401);

  const token = signJwt({ sub: user.id, role: user.role });

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}

export async function me(userId: string) {
  const u = await findUserById(userId);
  if (!u) throw new AppError("User not found", 404);
  return u;
}
export async function refreshToken(userId: string) {
  const u = await findUserById(userId);
  if (!u) throw new AppError("User not found", 404);
  const token = signJwt({ sub: u.id, role: u.role });
  return {
    token,
    user: { id: u.id, name: u.name, email: u.email, role: u.role },
  };
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
  // For JWT, typically nothing to do on server side for logout
  return { message: "Logged out successfully" };
}
