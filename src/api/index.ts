//#region setup

//#region imports

import express, { Express, NextFunction, Request, Response } from "express";
import sqlite3, { Database } from 'sqlite3';
import {
  Configuration, databaseHealthCheck, error500Logger,
  exitStatus, HTTPCodes, loadConfig, requestLogger
} from "./utils.js";

//#endregion

const serverData: Configuration = loadConfig("server-options.json");
const app: Express = express();
const db: Database = new Database(":memory:"); // Mudar depois?

app.use(express.json());
app.use(requestLogger);

//#endregion

//#region GET

app.get("/api/health", (res: Response) => {
  if (process.uptime() < 1) // So services have time to start
    return res.status(HTTPCodes.serviceUnavailable).send({ status: "starting" });

  res.status(HTTPCodes.ok).send({ status: "ok" });
});

app.get("/api/ready", async (req: Request, res: Response) => {
  const dbOK: boolean = await databaseHealthCheck(db);

  if (!dbOK) return res.status(HTTPCodes.serviceUnavailable).send({
    status: "degraded",
    database: "down"
  });

  res.status(HTTPCodes.ok).send({
    status: "ok",
    database: "up"
  });

});

app.get('/api/users/:id', (req: Request, res: Response) => {
  res.status(HTTPCodes.ok).send({
    'user': 'david',
    'age': 21
  });
});

//#endregion

//#region POST

app.post('/api/signup', (req: Request, res: Response) => {
  res.status(HTTPCodes.notImplemented).send({status: "not implemented"}); // TODO
});

app.post('/api/signin', (req: Request, res: Response) => {
  res.status(HTTPCodes.notImplemented).send({status: "not implemented"}); // TODO
});

//#endregion

//#region PATCH

app.patch('/api/syncevents', (req: Request, res: Response) => {
  res.status(HTTPCodes.notImplemented).send({status: "not implemented"}); // TODO
});

//#endregion

//#region DELETE

app.delete('/api/users/:id', (req: Request, res: Response) => {
  res.status(HTTPCodes.notImplemented).send({status: "not implemented"}); // TODO
});

//#endregion

//#region errorHandlers

app.use(error500Logger);

//#endregion

//#region run

const server = app.listen(serverData.appPort, serverData.appIP, () => {
  console.log(`Serving @ http://${serverData.appIP}:${serverData.appPort}/`)
});

process.on("SIGINT", () => {
  console.log("Shutting down server");
  server.close(() => {process.exit(exitStatus.success)});
});

//#endregion
