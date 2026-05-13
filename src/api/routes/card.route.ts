import { Router } from "express";
import { getAllUserCards, getCardById, updateCard, createCard, deleteCard } from "../controllers/card.controller.ts";

export const cardRoutes = Router();

cardRoutes.get('/api/user/:id/cards', getAllUserCards);

cardRoutes.get('/api/card/:id', getCardById);

cardRoutes.post('/api/card', createCard);

cardRoutes.put('/api/card/',updateCard);

cardRoutes.delete('/api/card/:id',deleteCard);
