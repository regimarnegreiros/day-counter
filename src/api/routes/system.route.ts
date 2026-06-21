import { Router } from "express";
import { SystemController } from "../controllers/system.controller.ts";

export const systemRoutes = Router();

systemRoutes.get("/health", SystemController.health);

systemRoutes.get("/ready", SystemController.DBReady);

systemRoutes.patch("/syncevents", SystemController.syncEvents);

