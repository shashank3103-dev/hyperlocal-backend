export class AppError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status = 400, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

/**
 * Standard success response wrapper
 */
export const ok = <T>(data: T, message = "Success") => ({
  success: true,
  message,
  data,
});

/**
 * Standard error response wrapper
 */
export const fail = (message: string, status = 400, details?: unknown) => ({
  success: false,
  message,
  status,
  details,
});
