import { Server } from 'http';
import type { NextFunction, Request, Response } from "express";
import { type PathOrFileDescriptor, readFileSync } from "fs";
import { isIP } from "net";
import { type Database } from "sqlite3";

//#region interfaces

export interface Configuration {
  appIP: string;
  appPort: number;

};

//#endregion

//#region types



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

/**
 * Performs a database connection check with a SELECT statement
 * @param {Database} db An open database connection
 * @returns {Promise<void>}
 * A boolean. True if the statement went through, false if not
 */
export async function databaseHealthCheck(db: Database): Promise<boolean> {
  try {
    await new Promise<void>((resolve, reject) => {
      db.get("SELECT 1", (err: Error | null) => {
        if (err) reject(err);
        else resolve();
      })
    });

    return true;
  }
  catch {
    return false;
  }
}

function isConfiguration(obj: unknown): obj is Configuration {
  if (obj === null || typeof(obj) !== "object" || Array.isArray(obj)) return false;

  return (
    "appIP" in obj && "appPort" in obj
    && typeof(obj.appIP) === "string"
    && typeof(obj.appPort) === "number"
  );
}

/**
 * @description
 * Reads a JSON file specifying IP and port to serve the Express app.
 * If an error occurs during parsing, or if the given configuration is invalid,
 * logs the error and returns '127.0.0.1' as the IP and 3000 as the port.
 * @param {PathOrFileDescriptor} path
 * JSON configuration file path
 * @returns {Configuration}
 * A configuration, either the specified one
 * or a default, if an error occurs during parsing or validation
 */
export function loadConfig(path: PathOrFileDescriptor): Configuration {
  try {
    const config: unknown = JSON.parse(readFileSync(path, "utf-8"));

    if (!isConfiguration(config))
      throw new TypeError("Invalid configuration fields");
    if (isIP(config.appIP) === 0)
      throw new InvalidIPError("Invalid IP");
    if (!Number.isInteger(config.appPort) || config.appPort < 0 || config.appPort > 65535)
      throw new RangeError("Invalid port range");

    return {appIP: config.appIP, appPort: config.appPort};
  }
  catch (err) {
    if (err instanceof SyntaxError) // Parsing error
      console.error("Invalid JSON format");
    else
      console.error((err as Error).message);

    console.warn("Defaulting to 127.0.0.1:3000/");

    return { appIP: "127.0.0.1", appPort: 3000 };
  }
}

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  console.debug(`${req.method} REQUEST @ ${req.url}`);
  console.debug(`COOKIES: ${JSON.stringify(req.cookies, null, 2)}\n`);
  console.debug(`HEADER: ${JSON.stringify(req.headers, null, 2)}\n`);
  console.debug(`BODY: ${JSON.stringify(req.body, null, 2)}\n`);
  next();
}

export function error500Logger(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(err.stack);
  res.status(HTTPCodes.internalError).send({ error: "internal server error" });
}

export function shutdown(server: Server, db: Database) {
  server.close(() => {
    console.log("Shutting down server");
    db.close((err) => {
      if (err) {
        console.error(err);
        process.exit(exitStatus.unspecifiedError);
      }

      console.log("Database connection closed");
      process.exit(exitStatus.success)
    })
  });
  setTimeout(() => {
    console.error("Timeout!!!");
    process.exit(exitStatus.timeout);
  }, 3000);
}

//#endregion

//#region constants

export const exitStatus = Object.freeze({
  success: 0,
  unspecifiedError: 1,
  timeout: 2,
});

export const HTTPCodes = Object.freeze({
  /** Successful request */
  ok: 200,
  /** New resoruce created */
  created: 201,
  /** Accessible via alternate URI in Location header */
  found: 302,
  /** Client error, server rejects request */
  badRequest: 400,
  /** Authentication required */
  unauthorized: 401,
  /** Not enough permissions */
  forbidden: 403,
  /** Resource not found */
  notFound: 404,
  /** Request took too long, server rejected */
  requestTimeout: 408,
  /** Generic server error */
  internalError: 500,
  /** Request method not recognized or can't fulfil request */
  notImplemented: 501,
  /** Server not ready to fulfil request (overload, down for maintenance, etc.) */
  serviceUnavailable: 503,

});

//#endregion
