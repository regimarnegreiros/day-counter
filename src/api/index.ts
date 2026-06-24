//#region setup

//#region imports

import express, { type Express } from "express";
import {
  type Configuration,
  exitStatus,
  loadConfig,
  shutdown,
} from "./utils/utils.ts";
import { Server } from "http";
import { userRoutes } from "./routes/user.route.ts";
import { cardRoutes } from "./routes/card.route.ts";
import { systemRoutes } from "./routes/system.route.ts";
import { requestLogger } from "./middlewares/log.middleware.ts";
import { errorMiddleware } from "./middlewares/error.middleware.ts";
import { configDotenv } from "dotenv";
import JWT from "./utils/jwt.singleton.ts";
import { authentication } from "./middlewares/authentication.middleware.ts";
import { authorization } from "./middlewares/authorization.middleware.ts";

//#endregion
configDotenv();

await JWT.initialize();
const serverData: Configuration = loadConfig("server-options.json");
const app: Express = express();
const isDev = async () => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      "valid baerer token:\nBearer",
      await JWT.sign({
        userID: "019ee7fb-f0cd-732e-a675-933e90dad723",
        email: "fulano@example.com",
        name: "Fulano de Tal",
      }),
    );
  }
};
isDev();

//#region middlewares

app.use(express.json());
app.use(requestLogger);
app.use(authentication);
app.use(authorization);

//#endregion

//#region application_routes

app.use('/api',cardRoutes);
app.use('/api',userRoutes);
app.use('/api',systemRoutes);

//#endregion

//#region errorHandlers

app.use(errorMiddleware);

//#endregion

//#region run

const server: Server = app.listen(serverData.appPort, serverData.appIP, () => {
  console.log(`Serving @ http://${serverData.appIP}:${serverData.appPort}/`);
});

process.once("SIGINT", () => shutdown(server));
process.once("SIGTERM", () => shutdown(server));

//#endregion
