import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/http.js';
import { logger } from '../config/logger.js';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err instanceof AppError ? err.status : 500;
  const message = err instanceof AppError ? err.message : 'Internal Server Error';
  if (status === 500) logger.error(err);
  res.status(status).json({ success: false, message });
}
