// import "dotenv/config";

// export const config = {
//   env: process.env.NODE_ENV ?? "development",
//   port: Number(process.env.PORT ?? 5000),
//   dbUrl: process.env.DATABASE_URL!,
//   jwtSecret: process.env.JWT_SECRET!,
//   jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
//   bcryptRounds: Number(process.env.BCRYPT_ROUNDS ?? 10),
// };
// if (!config.dbUrl || !config.jwtSecret) {
//   throw new Error("Missing required env vars (DATABASE_URL, JWT_SECRET)");
// }

import "dotenv/config";

export const config = {
  env: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  dbUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,                     // access token secret
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "15m",      // short-lived access
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,      // refresh token secret
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d", // long-lived
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS ?? 10),
};

if (!config.dbUrl || !config.jwtSecret || !config.jwtRefreshSecret) {
  throw new Error("Missing required env vars (DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET)");
}


