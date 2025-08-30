import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export type JwtPayload = {
  sub: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
  iat?: number;
  exp?: number;
};

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, config.jwtAccessSecret, { expiresIn: "15m" });
}

export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: "15d" });
}
export function verifyAccessToken(token: string) {
  return jwt.verify(token, config.jwtAccessSecret) as JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, config.jwtRefreshSecret) as JwtPayload;
}
