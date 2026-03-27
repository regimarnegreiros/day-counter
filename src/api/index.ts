//#region setup

//#region imports
import express, { Express, NextFunction, Request, Response } from "express";
import { Configuration, error500Logger, exitStatus, HTTPCodes, loadConfig, printRequests } from "./utils.js";
//#endregion

const serverData: Configuration = loadConfig("server-options.json");
const [appIP, appPort] = [serverData.appIP, serverData.appPort];

const app: Express = express();

app.use(express.json());
app.use(printRequests);

//#endregion

//#region GET

app.get("/api/health", (req: Request, res: Response) => {
  res.status(HTTPCodes.ok).send({ status: "ok" });
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
  res.status(HTTPCodes.notImplemented).send({status: "not implemented"}); // to-implement
});

app.post('/api/signin', (req: Request, res: Response) => {
  res.status(HTTPCodes.notImplemented).send({status: "not implemented"}); // to-implement
});

//#endregion

//#region PATCH

app.patch('/api/syncevents', (req: Request, res: Response) => {
  res.status(HTTPCodes.notImplemented).send({status: "not implemented"}); // to-implement
});

//#endregion

//#region DELETE

app.delete('/api/users/:id', (req: Request, res: Response) => {
  res.status(HTTPCodes.notImplemented).send({status: "not implemented"}); // to-implement
});

//#endregion

//#region errorHandlers

app.use(error500Logger);

//#endregion

//#region run

const server = app.listen(appPort, appIP, () => {
  console.log(`Serving @ http://${appIP}:${appPort}/`)
});

process.on("SIGINT", () => {
  console.log("Shutting down server");
  server.close(() => {process.exit(exitStatus.success)});
});

//#endregion
