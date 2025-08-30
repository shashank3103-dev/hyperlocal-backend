import "dotenv/config";

export const config = {
  env: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  dbUrl: process.env.DATABASE_URL!,

  // Access Token
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,                     
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m", 

  // Refresh Token
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,      
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "15d", 

  bcryptRounds: Number(process.env.BCRYPT_ROUNDS ?? 10),
};

if (!config.dbUrl || !config.jwtAccessSecret || !config.jwtRefreshSecret) {
  throw new Error("Missing required env vars (DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET)");
}


