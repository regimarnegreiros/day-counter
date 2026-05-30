import type { Request, Response, NextFunction } from "express";
import { HTTPCodes } from "../utils/utils.ts";

export function error500Logger(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(err.stack);
  res.status(HTTPCodes.internalError).send({ error: "internal server error" });
}
