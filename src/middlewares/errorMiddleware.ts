import { Request, Response, NextFunction } from "express";
import { SERVER_MESSAGES } from "../utils/constants";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message);
  res.status(500).json({ message: SERVER_MESSAGES.INTERNAL_SERVER_ERROR });
};
