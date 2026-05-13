import { DatabaseSingleton } from "../database/database.singleton.ts";

export default class CardRepository {
    private constructor(){}
  static async deleteCard(id: Number) {
    const db = DatabaseSingleton.getInstance();
    //db delete code
  }

  static async getCardById(id: Number) {
    const db = DatabaseSingleton.getInstance();
    //db select code
  }

  static async getAllUserCards() {
    const db = DatabaseSingleton.getInstance();
    //db select code
  }
  static async updateCard(
    id: Number,
    title: string,
    icon: string,
    type: string,
    start_date: string,
    end_date: string,
    hue: string,
    description: string,
    notify_interval: string,
  ) {
    const db = DatabaseSingleton.getInstance();
    //db update code
  }

  static async createCard(
    title: string,
    icon: string,
    type: string,
    start_date: string,
    end_date: string,
    hue: string,
    description: string,
    notify_interval: string,
  ) {
    const db = DatabaseSingleton.getInstance();
    //db insert code
  }
}
