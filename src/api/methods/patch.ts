import { Request, Response } from "express";
import { HTTPCodes } from "../utils.ts";

export async function syncEvents(req: Request, res: Response) {
    res.status(HTTPCodes.notImplemented).send({status: "not implemented"}); // TODO
}