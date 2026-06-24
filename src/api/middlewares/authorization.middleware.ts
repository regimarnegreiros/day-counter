import type { Request, Response, NextFunction } from "express";
import { HTTPCodes } from "../utils/utils.ts";
import CardRepository from "../repositories/card.repository.ts";
import validator from "validator";

export async function authorization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = req.body["userInfo"];

  const urlArray = req.url.split("/");
  const paramId = urlArray[urlArray.length - 1];
  const isUUID = validator.isUUID(paramId, 7);
  if (!isUUID) {
    return next();
  }
  if (req.url.startsWith("/api/user/card")) {
    const card = await getCardOwn(user.userId, paramId);
    if (!card)
      return res
        .status(HTTPCodes.notFound)
        .json({ error: "Recurso não encontrado" });
    else if (card.user_id !== user.userID)
      return res
        .status(HTTPCodes.forbidden)
        .json({ error: "Recurso não autorizado" });
  } else if (req.method == "GET" && req.url.startsWith("/api/user/")) {
    return next();
  } else if (req.url.startsWith("/api/user/")) {
    if (user.userID !== paramId) {
      return res
        .status(HTTPCodes.forbidden)
        .json({ error: "Recurso não autorizado" });
    }
  } else if (req.url.startsWith("/api/card/")) {
    const cards = await CardRepository.getUserCards(user.userID);
    const cardId = paramId;
    const search_card = cards.filter((card) => card.cardID === cardId);
    if (!search_card)
      return res
        .status(HTTPCodes.notFound)
        .json({ error: "Recurso não encontrado" });
    else if (search_card[0].user_id !== user.userID)
      return res
        .status(HTTPCodes.unauthorized)
        .json({ error: "Recurso não autorizado" });
  }
  return next();
}

async function getCardOwn(userId: string, cardId: string) {
  const cards = await CardRepository.getUserCards(userId);
  const search_card = cards.filter((card) => card.cardID === cardId);
  return search_card[0];
}
