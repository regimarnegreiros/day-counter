//#region setup

//#region imports

import express, { Express, Request, Response } from "express";
import {
  Configuration, error500Logger,
  exitStatus, loadConfig, requestLogger,
  shutdown
} from "./utils.ts";
import { DBReady, health, userInfo } from "./methods/get.ts";
import { signIn, signUp } from "./methods/post.ts";
import { syncEvents } from "./methods/patch.ts";
import { deleteUser } from "./methods/delete.ts";
import sqlite3 from "sqlite3";
import { Server } from "http";
const { Database } = sqlite3;

//#endregion

type Database = sqlite3.Database;
const serverData: Configuration = loadConfig("server-options.json");
const app: Express = express();
const db: Database = new Database(":memory:"); // Mudar depois?

app.use(express.json());
app.use(requestLogger);

//#endregion

//#region GET

app.get("/api/health", health);

app.get("/api/ready", (_req: Request, res: Response) => DBReady(res, db));

app.get("/api/users/:id", userInfo);

//#endregion

//#region POST

app.post("/api/signup", signUp);

app.post("/api/signin", signIn);

//#endregion

//#region PATCH

app.patch("/api/syncevents", syncEvents);

//#endregion

//#region DELETE

app.delete("/api/users/:id", deleteUser);

//#endregion

//#region errorHandlers

app.use(error500Logger);

//#endregion

//#region run

const server: Server = app.listen(serverData.appPort, serverData.appIP, () => {
  console.log(`Serving @ http://${serverData.appIP}:${serverData.appPort}/`)
});

process.once("SIGINT", () => shutdown(server, db));
process.once("SIGTERM", () => shutdown(server, db));

//#endregion
