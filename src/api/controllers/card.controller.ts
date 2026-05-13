import type { Request, Response } from "express"
import { HTTPCodes } from "../utils.ts"

export async function deleteCard(req: Request, res: Response) {
    //calls db instance and execute a delete
    res.status(HTTPCodes.notImplemented).send()
}

export async function getCardById(req: Request, res: Response) {
  //calls db and exec a select;
  return res.status(HTTPCodes.notImplemented).send();
}

export async function getAllUserCards(req: Request, res: Response) {
  //calls db and exec a select;
  return res.status(HTTPCodes.notImplemented).send();
}
export async function updateCard(req: Request, res: Response) {
    // calls db instance and execute a update
    res.status(HTTPCodes.notImplemented).send();
}

export async function createCard(req: Request, res: Response){
    const {title, icon, type, start_date, end_date, hue, description, notify_interval} = req.body;
    //calls db and send insert.
    res.status(HTTPCodes.notImplemented).send()
}
