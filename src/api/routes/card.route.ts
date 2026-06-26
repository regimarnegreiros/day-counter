import { Router } from "express";
import CardController from "../controllers/card.controller.ts";

export const cardRoutes = Router();

cardRoutes.get('/user/cards', CardController.getAllUserCards);

cardRoutes.get('/user/card/:cardId', CardController.getCardById);

cardRoutes.post('/user/card', CardController.createCard);

cardRoutes.put('/user/card/:cardId', CardController.updateCard);

cardRoutes.delete('/user/card/:cardId', CardController.deleteCard);
