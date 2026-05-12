import type { Request, Response } from "express";
import { HTTPCodes } from "../utils.ts";

export async function syncEvents(req: Request, res: Response) {
    res.status(HTTPCodes.notImplemented).send({status: "not implemented"}); // TODO
}

export async function updateCard(req: Request, res: Response) {
    // calls db instance and execute a update
    res.status(HTTPCodes.notImplemented).send();
}