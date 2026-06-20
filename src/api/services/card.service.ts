import CardRepository from "../repositories/card.repository.ts";
import { createCardSchema, updateCardSchema } from "../schemas/cardSchema.ts";
import { z } from "zod";

export default class CardService{
    private constructor(){}

    static async createCard(user_id: string, data: z.infer<typeof createCardSchema>){
        const validatedData = createCardSchema.parse(data);
        const card_data = {
            ...validatedData,
            end_date: validatedData.end_date || null,
            description: validatedData.description || null,
            user_id
        };
        return await CardRepository.createCard(card_data as any);
    }   

    static async getCardById(id: string) {
        return await CardRepository.getCardById(id);
    }
    
    static async getAllUserCards(user_id: string) {
        return await CardRepository.getUserCards(user_id);
    }

    static async deleteCard(id: string) {
        return await CardRepository.deleteCard(id);
    }

    static async updateCard(id: string, updates: z.infer<typeof updateCardSchema>) {
        const validatedUpdates = updateCardSchema.parse(updates);
        if (Object.keys(validatedUpdates).length === 0) {
            return false;
        }
        return await CardRepository.updateCard(id, validatedUpdates as any);
    }
}