import type { NextFunction, Request, Response } from "express";
import { HTTPCodes } from "../utils/utils.ts";
import UserService from "../services/user.service.ts";
import validator from "validator";
import CardService from "../services/card.service.ts";

export default class CardController {
  static async deleteCard(req: Request, res: Response, next: NextFunction) {
    const id = req.params["cardId"];
    if (typeof id != "string" || !validator.isUUID(id,7)) {
      res.status(404);
      return next(new Error("ID invalido"));
    }
    await CardService.deleteCard(id);
    res.status(HTTPCodes.noContent).json({message: "excluido com sucesso!"});
  }

  static async getCardById(req: Request, res: Response, next: NextFunction) {
    const id = req.params["cardId"];
    if (typeof id != "string" || !validator.isUUID(id,7)) {
      res.status(404);
      return next(new Error("ID invalido"));
    }
    const card = await CardService.getCardById(id);
    return res.status(HTTPCodes.ok).json({data: card});
  }

  static async getAllUserCards(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const user = req.body["userInfo"];
    const cards = await CardService.getAllUserCards(user.userID);
    return res.status(HTTPCodes.ok).json({data: cards});
  }
  static async updateCard(req: Request, res: Response, next: NextFunction) {
    const id = req.params["cardId"];
    const {
      icon,
      title,
      type,
      start_date,
      end_date,
      description,
      hue,
      notify_interval,
    } = req.body;
    if (typeof id != "string" || !validator.isUUID(id,7)) {
      res.status(404);
      return next(new Error("ID invalido"));
    }
    await CardService.updateCard(id, {
      icon,
      title,
      type,
      start_date,
      end_date,
      description,
      hue,
      notify_interval,
    });
    res.status(HTTPCodes.ok).json({message: "atualizado com sucesso!"});
  }

  static async createCard(req: Request, res: Response) {
    const {
      userInfo,
      title,
      icon,
      type,
      start_date,
      end_date,
      hue,
      description,
      notify_interval,
    } = req.body;
    const card = {
      title,
      icon,
      type,
      start_date,
      end_date,
      hue,
      description,
      notify_interval,
    };
    const cardID = await CardService.createCard(userInfo.userID, card);
    res.status(HTTPCodes.created).json({message: "Criado com sucesso!", cardID: cardID});
  }
}
