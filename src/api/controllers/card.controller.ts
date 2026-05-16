import type { Request, Response } from "express"
import { HTTPCodes } from "../utils/utils.ts"
import CardService from '../services/card.service.ts'

export default class CardController{

    static async deleteCard(req: Request, res: Response) {
        
        res.status(HTTPCodes.notImplemented).send()
    }
    
    static async getCardById(req: Request, res: Response) {
        //calls db and exec a select;
        return res.status(HTTPCodes.notImplemented).send();
    }
    
    static async getAllUserCards(req: Request, res: Response) {
        //calls db and exec a select;
        return res.status(HTTPCodes.notImplemented).send();
    }
    static async updateCard(req: Request, res: Response) {
        // calls db instance and execute a update
        res.status(HTTPCodes.notImplemented).send();
    }
    
    static async createCard(req: Request, res: Response){
        const {title, icon, type, start_date, end_date, hue, description, notify_interval} = req.body;
        //calls db and send insert.
        res.status(HTTPCodes.notImplemented).send()
    }   
}