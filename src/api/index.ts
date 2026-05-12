//#region setup

//#region imports

import express from "express";
import type { Express, Request, Response } from 'express';
import {
  type Configuration, error500Logger,
  exitStatus, loadConfig, requestLogger, shutdown
} from "./utils.ts";
import { DBReady, getCardById, health, userInfo} from "./methods/get.ts";
import { signIn, signUp, createCard } from "./methods/post.ts";
import { syncEvents, updateCard } from "./methods/patch.ts";
import { deleteCard, deleteUser } from "./methods/delete.ts";
import sqlite3 from "sqlite3";
import { Server } from "http";
import { DatabaseSingleton } from "./database/database.ts";
const { Database } = sqlite3;

//#endregion

type Database = sqlite3.Database;
const serverData: Configuration = loadConfig("server-options.json");
const app: Express = express();
DatabaseSingleton.setInstance(':memory:'); // change later to a database path

//middlewares

app.use(express.json());
app.use(requestLogger);

//#endregion

//#region GET

app.get("/api/health", health);

app.get("/api/ready", (_req: Request, res: Response) => DBReady(res, DatabaseSingleton.getInstance()));

app.get("/api/users/:id", userInfo);

app.get('/api/users/cards')

app.get('/api/card/:id', getCardById);

//#endregion

//#region POST

app.post("/api/signup", signUp);

app.post("/api/signin", signIn);

app.post('/api/card', createCard);

//#endregion

//#region PATCH

app.patch("/api/syncevents", syncEvents);

app.patch('/api/card',updateCard);

//#endregion

//#region DELETE

app.delete("/api/users/:id", deleteUser);

app.delete('/api/card/:id',deleteCard);

//#endregion

//#region errorHandlers

app.use(error500Logger);

//#endregion

//#region run

const server: Server = app.listen(serverData.appPort, serverData.appIP, () => {
  console.log(`Serving @ http://${serverData.appIP}:${serverData.appPort}/`)
});

process.once("SIGINT", () => shutdown(server, DatabaseSingleton.getInstance()));
process.once("SIGTERM", () => shutdown(server, DatabaseSingleton.getInstance()));

//#endregion
