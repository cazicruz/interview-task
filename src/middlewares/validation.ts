import { Request, Response, NextFunction } from 'express';
import { checkSchema, validationResult, Schema } from 'express-validator';

export const validateAndSanitize = (schema: Schema) => {
  return [
    // Dynamically apply validation and sanitization rules
    checkSchema(schema),

    // Middleware to handle validation errors
    (req: Request, res: Response, next: NextFunction):any => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
      next();
    },
  ];
};
