import { Router } from "express";
import { health, DBReady, syncEvents } from "../controllers/system.controller.ts";
import { DatabaseSingleton } from "../database/database.singleton.ts";

export const systemRoutes = Router();

systemRoutes.get("/api/health", health);

systemRoutes.get("/api/ready", DBReady);

systemRoutes.patch("/api/syncevents", syncEvents);

