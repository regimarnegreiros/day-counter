import { prisma } from "../database/database.ts";
import { type Card } from "../utils/utils.ts";
import { v7 as UUIDv7 } from "uuid";

function mapPrismaCardToCard(c: any): Card {
  return {
    cardID: c.id,
    icon: c.icon,
    title: c.title,
    type: c.type,
    start_date: c.start_date,
    end_date: c.end_date ?? "",
    description: c.description ?? "",
    hue: c.hue,
    notify_interval: c.notify_interval,
    user_id: c.user_id,
  };
}

export default class CardRepository {
  private constructor() {}

  static async deleteCard(cardID: string) {
    try {
      const result = await prisma.counters.delete({
        where: { id: cardID },
      });
      return !!result;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async getCardById(cardID: string): Promise<Card | undefined> {
    try {
      const card = await prisma.counters.findUnique({
        where: { id: cardID },
      });
      if (!card) return undefined;
      return mapPrismaCardToCard(card);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  static async getUserCards(userID: string): Promise<Array<Card>> {
    try {
      const cards = await prisma.counters.findMany({
        where: { user_id: userID },
      });
      return cards.map(mapPrismaCardToCard);
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  static async updateCard(
    cardID: string,
    updates: Partial<Omit<Card, "user_id" | "cardID">>
  ): Promise<boolean> {
    try {
      const result = await prisma.counters.updateMany({
        where: { id: cardID },
        data: updates as any,
      });
      return result.count > 0;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async createCard(card: Omit<Card, "cardID">): Promise<boolean> {
    try {
      const result = await prisma.counters.create({
        data: {
          id: UUIDv7(),
          icon: card.icon,
          title: card.title,
          type: card.type,
          start_date: card.start_date,
          end_date: card.end_date || null,
          description: card.description || null,
          hue: card.hue,
          notify_interval: card.notify_interval,
          user_id: card.user_id,
        },
      });
      return !!result;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
