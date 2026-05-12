import type { Request, Response } from "express";
import { HTTPCodes } from "../utils.ts";

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
}

export async function deleteCard(req: Request, res: Response) {
    //calls db instance and execute a delete
    res.status(HTTPCodes.notImplemented).send()
}
