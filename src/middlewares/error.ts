import { NextFunction, Request, Response } from "express";
import { AppError, fail } from "../utils/http.js";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.status).json(fail(err.message, err.status, err.details));
  }

  console.error("[UNEXPECTED_ERROR]", err);

  return res.status(500).json(
    fail("Internal Server Error", 500)
  );
};
