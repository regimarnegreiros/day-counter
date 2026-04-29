import { Request, Response } from "express";
import { HTTPCodes } from "../utils";

export async function signIn(req: Request, res: Response) {
    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
}

export async function signUp(req: Request, res: Response) {
    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
}
