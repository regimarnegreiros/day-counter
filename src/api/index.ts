//#region setup

//#region imports

import express, { type Express } from "express";
import {
  type Configuration, exitStatus, loadConfig, shutdown
} from "./utils/utils.ts";
import { Server } from "http";
import { userRoutes } from "./routes/user.route.ts";
import { cardRoutes } from "./routes/card.route.ts";
import { systemRoutes } from "./routes/system.route.ts";
import { requestLogger } from "./middlewares/log.middleware.ts";
import { error500Logger } from "./middlewares/error.middleware.ts";
import { configDotenv } from "dotenv";
import JWT from './utils/jwt.singleton.ts';
import { authentication } from "./middlewares/authentication.middleware.ts";

//#endregion
configDotenv();

await JWT.initialize();
const serverData: Configuration = loadConfig("server-options.json");
const app: Express = express();
const isDev = async()=>{
  if(process.env.NODE_ENV === 'development'){
    console.log('valid baerer token:\nBearer', await JWT.sign({userId: '2ca277bf-28e1-4b7c-a606-500769a79757', email: 'exemple@exemple.com'}));
  }
}
isDev();

//#region middlewares

app.use(express.json());
app.use(requestLogger);
app.use(authentication);

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

process.once("SIGINT", () => shutdown(server));
process.once("SIGTERM", () => shutdown(server));

//#endregion
