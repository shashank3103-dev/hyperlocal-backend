import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.js";
import { AppError } from "../utils/http.js";

export interface AuthedRequest extends Request {
  user?: { sub: string; role: "CUSTOMER" | "SELLER" | "ADMIN" };
}

export function auth(required = true) {
  return (req: AuthedRequest, _res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) {
      if (!required) return next();
      throw new AppError("Unauthorized", 401);
    }
    const token = header.replace(/^Bearer\s+/i, "");
    try {
      req.user = verifyJwt(token);
      next();
    } catch {
      throw new AppError("Invalid token", 401);
    }
  };
}

export function requireRole(...roles: Array<"CUSTOMER" | "SELLER" | "ADMIN">) {
  return (req: AuthedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError("Unauthorized", 401);
    if (!roles.includes(req.user.role)) throw new AppError("Forbidden", 403);
    next();
  };
}
