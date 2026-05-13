import { Router } from "express";
import { SystemController } from "../controllers/system.controller.ts";
import { DatabaseSingleton } from "../database/database.singleton.ts";

export const systemRoutes = Router();

systemRoutes.get("/api/health", SystemController.health);

systemRoutes.get("/api/ready", SystemController.DBReady);

systemRoutes.patch("/api/syncevents", SystemController.syncEvents);

