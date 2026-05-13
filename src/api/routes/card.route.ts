import { Router } from "express";
import CardController from "../controllers/card.controller.ts";

export const cardRoutes = Router();

cardRoutes.get('/api/user/:id/cards', CardController.getAllUserCards);

cardRoutes.get('/api/card/:id', CardController.getCardById);

cardRoutes.post('/api/card', CardController.createCard);

cardRoutes.put('/api/card/', CardController.updateCard);

cardRoutes.delete('/api/card/:id', CardController.deleteCard);
