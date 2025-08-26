// import jwt, { SignOptions, Secret } from 'jsonwebtoken';
// import { config } from '../config/env.js';

// export type JwtPayload = { sub: string; role: 'CUSTOMER'|'SELLER'|'ADMIN' };

// export const signJwt = (payload: JwtPayload) => {
//   const options: SignOptions = {
//     expiresIn: config.jwtExpiresIn as SignOptions['expiresIn'],
//   };
//   return jwt.sign(payload as object, config.jwtSecret as Secret, options);
// };

// export const verifyJwt = (token: string) =>
//   jwt.verify(token, config.jwtSecret as Secret) as JwtPayload;

import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "supersecret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refreshsecret";

export type JwtPayload = {
  sub: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
  iat?: number;
  exp?: number;
};
// Access token (short lived, e.g. 15m)
export function signAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

// Refresh token (longer lived, e.g. 7d)
export function signRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as any;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as any;
}
