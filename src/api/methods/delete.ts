import { Request, Response } from "express";
import { HTTPCodes } from "../utils.ts";

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
}
