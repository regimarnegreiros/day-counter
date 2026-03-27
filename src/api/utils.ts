import { NextFunction, Request, Response } from "express";
import { PathOrFileDescriptor, readFileSync } from "fs";
import { isIP } from "net";

//#region interfaces

export interface Configuration {
  appIP: string;
  appPort: number;

};

//#endregion

//#region types

type possibleConfig = Record<string, unknown>;

//#endregion

//#region classes

class InvalidIPError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidIPError";
  }
}

//#endregion

//#region functions

function isConfiguration(obj: unknown): obj is Configuration {
  if (obj === null || typeof(obj) !== "object") return false;

  const castObj = obj as possibleConfig;
    return (typeof(castObj.appIP) === "string"
      && typeof(castObj.appPort) === "number"
    );
}

export function loadConfig(path: PathOrFileDescriptor): Configuration {
  try {
    const config: unknown = JSON.parse(readFileSync(path, "utf-8"));

    if (!isConfiguration(config))
      throw new TypeError("Invalid type");
    if (isIP(config.appIP) === 0)
      throw new InvalidIPError("Invalid IP");
    if (config.appPort < 0 || config.appPort > 65535)
      throw new RangeError("Invalid port range");

    return {appIP: config.appIP, appPort: config.appPort};
  }
  catch (err) {
    if (err instanceof SyntaxError)
      console.error("Invalid JSON format");
    else
      console.error((err as Error).message);

    console.warn("Defaulting to 127.0.0.1:3000/");

    return { appIP: "127.0.0.1", appPort: 3000 };
  }
}

export function printRequests(req: Request, res: Response, next: NextFunction): void {
  console.debug(`method: ${req.method}`);
  console.debug(`url: ${req.url}`);
  console.debug(`header: ${JSON.stringify(req.headers, null, 2)}`);
  console.debug(`body: ${JSON.stringify(req.body, null, 2)}`);
  next();
}

export function error500Logger(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(err.stack);
  res.status(HTTPCodes.internalError).send({ error: "internal server error" });
}


//#endregion

//#region constants

export const exitStatus = Object.freeze({
  success: 0,
  unspecifiedError: 1,
});

export const HTTPCodes = Object.freeze({
  ok: 200,
  created: 201,
  found: 302,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  requestTimeout: 408,
  internalError: 500,
  notImplemented: 501,

});

//#endregion
