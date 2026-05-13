//#region setup

//#region imports

import express, { type Express } from "express";
import {
  type Configuration, exitStatus, loadConfig, shutdown
} from "./utils.ts";
import sqlite3 from "sqlite3";
import { Server } from "http";
import { DatabaseSingleton } from "./database/database.singleton.ts";
import { userRoutes } from "./routes/user.route.ts";
import { cardRoutes } from "./routes/card.route.ts";
import { systemRoutes } from "./routes/system.route.ts";
import { requestLogger } from "./middlewares/log.middleware.ts";
import { error500Logger } from "./middlewares/error.middleware.ts";

//#endregion

type Database = sqlite3.Database;
const serverData: Configuration = loadConfig("server-options.json");
const app: Express = express();
DatabaseSingleton.setInstance(':memory:'); // change later to a database path

//#region middlewares

app.use(express.json());
app.use(requestLogger);

//#endregion

//#region application_routes

app.use(userRoutes);
app.use(cardRoutes);
app.use(systemRoutes);

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
