import fs from "fs";
import path from "path";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Ensure logs directory exists
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
);

export const logger = createLogger({
  level: "info",
  format: logFormat,
  transports: [
    // Console (always visible in dev)
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),

    // Daily rotate for all logs
    new DailyRotateFile({
      dirname: logDir,
      filename: "app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,       // compress old logs
      maxSize: "20m",            // rotate if file > 20MB
      maxFiles: "14d",           // keep logs for 14 days
      level: "info",
    }),

    // Daily rotate only errors
    new DailyRotateFile({
      dirname: logDir,
      filename: "error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "30d",           // keep error logs longer
      level: "error",
    }),
  ],
});
