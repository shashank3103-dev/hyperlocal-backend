import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["CUSTOMER", "SELLER","ADMIN"]).optional(), // ADMIN only via DB
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
export const verifyOtpSchema = z.object({
  body: z.object({
    email: z.string().email(),
    otp: z.string().length(6),
  }),
});

export const resendOtpSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(10),
  }),
});

export const logoutSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(10),
  }),
});
export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
  }),
});
export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
    otp: z.string().length(6),
    newPassword: z.string().min(6),
  }),
});
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});
export const availabilitySchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().min(10).max(15).optional(),
});

export const googleLoginSchema = z.object({
  token: z.string().min(10), // Google ID token
});

export const revokeSessionSchema = z.object({
  sessionId: z.string().uuid(),
});

export const enable2FASchema = z.object({
  method: z.enum(["TOTP", "SMS"]),
});

export const verify2FASchema = z.object({
  email: z.string().email(),
  code: z.string().min(4).max(8),
});