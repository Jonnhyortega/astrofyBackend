import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const searchErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      msg: err.msg,
      param: (err as any).param, 
      location: (err as any).location, 
      statusCode: (err as any).statusCode || 400, 
    }));

    const statusCode = extractedErrors[0]?.statusCode || 400;

    res.status(statusCode).json({ errors: extractedErrors });
  } else {
    next();
  }
};
