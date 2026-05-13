import type { Request, Response } from "express";
import { databaseHealthCheck, HTTPCodes } from "../utils.ts";
import { DatabaseSingleton } from "../database/database.singleton.ts";

export class SystemController{

    static health(_req: Request, res: Response) {
        if (process.uptime() < 1) // So services have time to start
        return res.status(HTTPCodes.serviceUnavailable).send({ status: "starting" });
        
        res.status(HTTPCodes.ok).send({ status: "ok" });
    }
    
    static async DBReady(req: Request, res: Response) {
        const dbOK: boolean = await databaseHealthCheck(DatabaseSingleton.getInstance());
        
        if (!dbOK) return res.status(HTTPCodes.serviceUnavailable).send({
            status: "degraded",
            database: "down"
        });
        
        res.status(HTTPCodes.ok).send({
            status: "ok",
            database: "up"
        });
    }
    
    static async syncEvents(req: Request, res: Response) {
        res.status(HTTPCodes.notImplemented).send({status: "not implemented"}); // TODO
    }
}