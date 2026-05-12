import type { Request, Response } from "express";
import { HTTPCodes } from "../utils.ts";

export async function signIn(req: Request, res: Response) {
    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
}

export async function signUp(req: Request, res: Response) {
    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
}

export async function createCard(req: Request, res: Response){
    const {title, icon, type, start_date, end_date, hue, description, notify_interval} = req.body;
    //calls db and send insert.
    res.status(HTTPCodes.notImplemented).send()
}
