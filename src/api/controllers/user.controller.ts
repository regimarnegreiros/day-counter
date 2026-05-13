import type { Request, Response } from "express";
import { HTTPCodes } from "../utils.ts";

export async function signIn(req: Request, res: Response) {
    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
}

export async function signUp(req: Request, res: Response) {
    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
}

export async function userInfo(req: Request, res: Response) {
  const { id } = req.params;

  res.status(HTTPCodes.ok).send({
    'user': 'david',
    'age': 21
  });
}

