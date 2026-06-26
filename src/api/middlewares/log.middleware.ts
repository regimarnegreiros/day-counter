import type { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  console.debug(`${req.method} REQUEST @ ${req.url}`);
  console.debug(`COOKIES: ${JSON.stringify(req.cookies, null, 2)}\n`);
  console.debug(`HEADER: ${JSON.stringify(req.headers, null, 2)}\n`);
  console.debug(`BODY: ${JSON.stringify(req.body, null, 2)}\n`);
  next();
}