import { DatabaseSingleton } from "../database/database.singleton.ts";
import { Card } from "../utils.ts";

export default class CardRepository {
  private constructor() {}

  static async deleteCard(cardID: number): Promise<boolean> {
    const db = DatabaseSingleton.getInstance();

    return new Promise<boolean>((resolve, reject) => {
      db.run("DELETE FROM users WHERE id = ?", [cardID], function (err) {
        if (err) {
          reject(err);
          return;
        }

        resolve(this.changes > 0);
      });
    });
  }

  static async getCardById(cardID: number): Promise<Card | undefined> {
    const db = DatabaseSingleton.getInstance();

    return new Promise<Card | undefined>((resolve, reject) => {
      db.get("SELECT * FROM counters WHERE id = ?", [cardID], (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(row as Card | undefined);
      })
    });
  }

  static async getUserCards(userID: number): Promise<Array<Card>> {
    const db = DatabaseSingleton.getInstance();

    return new Promise<Array<Card>>((resolve, reject) => {
      db.all("SELECT * FROM counters WHERE user_id = ?", [userID],
        (err, rows) => {
          if (err) {
            reject(err);
            return;
          }

          resolve((rows ?? []) as Array<Card>);
        });

    });
  }
  static async updateCard(
    cardID: number,
    updates: Partial<Omit<Card, "user_id" | "cardID">>
  ): Promise<boolean> {
    const db = DatabaseSingleton.getInstance();

    return new Promise<boolean>((resolve, reject) => {
      const fields: Array<string> = [];
      const values: Array<any> = [];

      Object.entries(updates).forEach((pair) => {
        fields.push(`${pair[0]} = ?`);
        values.push(pair[1]);
      });

      if (fields.length === 0) {
        resolve(false);
        return;
      }

      values.push(cardID);

      db.run(
        `UPDATE counters SET ${fields.join(", ")} WHERE id = ?`,
        values,
        function (err) {
          if (err) {
            reject(err);
            return;
          }

          resolve(this.changes > 0);
        }
      );
    });
  }

  static async createCard(card: Omit<Card, "cardID">): Promise<boolean> {
    const db = DatabaseSingleton.getInstance();

    return new Promise<boolean>((resolve, reject) => {
      const fields: Array<string> = []; // ["id"]
      const values: Array<any> = []; // [uuid.v7()]

      Object.entries(card).forEach((pair) => {
        fields.push(`${pair[0]}`);
        values.push(pair[1]);
      });

      db.run(`INSERT INTO counters(${fields.join(", ")})`
           + ` VALUES (${"?, ".repeat(values.length - 1) + "?"})`,
          values,
          function (err) {
            if (err) {
              reject(err);
              return;
            }

            resolve(this.changes > 0);
          }
        );
    });
  }
}
