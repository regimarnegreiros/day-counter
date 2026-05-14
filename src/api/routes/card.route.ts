import { Router } from "express";
import CardController from "../controllers/card.controller.ts";

export const cardRoutes = Router();

cardRoutes.get('/api/user/:userId/cards', CardController.getAllUserCards);

cardRoutes.get('/api/user/card/:cardId', CardController.getCardById);

cardRoutes.post('/api/user/card', CardController.createCard);

cardRoutes.put('/api/user/card/', CardController.updateCard);

cardRoutes.delete('/api/user/card/:cardId', CardController.deleteCard);
