import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/http';

export const validate =
  (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({ body: req.body, query: req.query, params: req.params });
    if (!result.success) {
      const msg = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
      throw new AppError(msg, 422);
    }
    next();
  };
