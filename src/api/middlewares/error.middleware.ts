import type { Request, Response, NextFunction } from "express";
import { HTTPCodes } from "../utils/utils.ts";

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(err.stack)
  if(res.statusCode == HTTPCodes.notFound){
    res.json({error: err.message})
  }else if(res.statusCode == HTTPCodes.internalError){
    res.json({ error: "internal server error" });
  }
}
