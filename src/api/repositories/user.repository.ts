// in theory this class should call database functions that execute sql,
// but i think we should execute sql here to simplify.

import { type Database } from "sqlite3";
import { DatabaseSingleton } from "../database/database.singleton.ts";
import { hash } from "../hash.ts";
import { type Card, type User, SafeUser, UserCard, Resolver, Rejector } from "../utils/utils.ts";
import { isEmail, isUUID } from "validator";
import { v7 as UUIDv7 } from "uuid";


function getUserWithCards(
    db: Database, emailOrId: string,
    resolve: Resolver<User | undefined>, reject: Rejector
) {
    const userQuery = "u.id as userID, u.name, u.email, u.password";
    const cardQuery = (
        "c.id as cardID, c.icon, c.title, c.type,"
        + "c.start_date, c.end_date, c.description, "
        + "c.hue, c.notify_interval"
    );
    const whereClause = `WHERE u.${isEmail(emailOrId)? "email" : "id"} = ?`;
    const query = (`SELECT ${userQuery}, ${cardQuery} `
        + "FROM users u JOIN counters c ON u.id = c.user_id "
        + whereClause);

    db.all(query, [emailOrId], (err, rows) => {
        if (err) {
            reject(err);
            return;
        }

        if (rows === undefined || rows.length === 0) {
            resolve(undefined);
            return;
        }

        type NullableUserCard = {
            [K in keyof UserCard]: UserCard[K] | null
        };
        const queryCast = rows as Array<User & NullableUserCard>;
        const value: User = {
            userID: queryCast[0].userID,
            email: queryCast[0].email,
            name: queryCast[0].name,
            password: queryCast[0].password,
            cards: []
        };

        queryCast.forEach((row) => {
            if (row.cardID !== null) return;

            const rowCast = row as UserCard;
            const card: UserCard = {
                cardID: rowCast.cardID,
                description: rowCast.description,
                end_date: rowCast.end_date,
                hue: rowCast.hue,
                icon: rowCast.icon,
                notify_interval: rowCast.notify_interval,
                start_date: rowCast.start_date,
                title: rowCast.title,
                type: rowCast.type,
            };
            value.cards?.push(card);
        });

        resolve(value);
    });
}

function getOnlyUser(
    db: Database, emailOrId: string,
    resolve: Resolver<User | undefined>, reject: Rejector
) {
    const whereClause = `WHERE u.${isEmail(emailOrId)? "email" : "id"} = ?`;
    const query = (
        "SELECT u.id as userID, u.name, u.email, u.password FROM users u "
      + whereClause
    );

    db.get(query, [emailOrId], (err, row) => {
        if (err) {
            reject(err);
            return;
        }

        resolve(row as User | undefined);
    });
}

export default class UserRepository {
    private constructor() {}

    static async deleteUser(userID: string): Promise<boolean> {
        const db = DatabaseSingleton.getInstance();

        return new Promise<boolean>((resolve, reject) => {
            db.run("DELETE FROM users WHERE id = ?", [userID], function (err) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(this.changes > 0);
            });
        });
    }

    static async getUserByEmailOrId(
        emailOrId: string,
        getCards: boolean = false
    ): Promise<User | undefined> {
        if (!isEmail(emailOrId) || !isUUID(emailOrId)) throw new Error("E-mail ou ID inválido");

        const db = DatabaseSingleton.getInstance();

        return new Promise<User | undefined>((resolve, reject) => {
            if (getCards)
                getUserWithCards(db, emailOrId, resolve, reject);
            else
                getOnlyUser(db, emailOrId, resolve, reject);
        });
    }

    static async signIn(
        email: string, hashedPassword: string
    ): Promise<boolean> {
        const db = DatabaseSingleton.getInstance();

        return new Promise<boolean>((resolve, reject) => {
            db.get("SELECT * FROM users WHERE email = ? AND password = ?",
                    [email, hashedPassword],
                    (err: Error | null, row: User | undefined) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve(!!row);
                    }
            );
        });
    }

    static async signUp(
        name: string, email: string, hashedPassword: string
    ): Promise<SafeUser | undefined> {
        const db = DatabaseSingleton.getInstance();

        return new Promise<SafeUser | undefined>((resolve, reject) => {
            db.get("INSERT INTO users VALUES (?, ?, ?, ?) RETURNING id as userID, name, email",
                [UUIDv7(), name, email, hashedPassword],
                function (err: Error | null, row: User | undefined) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve({
                        userID: row?.userID as string,
                        email: row?.email as string,
                        name: row?.name as string,
                    });
                }
            )
        });
    }

    static async updateUserById(
        id: string,
        data: Omit<Partial<User>, "cards" | "userID">
    ): Promise<Omit<User, "cards"> | undefined> {
        const db = DatabaseSingleton.getInstance();

        return new Promise<Omit<User, "cards"> | undefined>((resolve, reject) => {
            const paramsString: string[] = [];
            const params = [];
            const keyValues = Object.entries(data);

            if (keyValues.length === 0) {
                reject(new Error("Nenhum dado para atualizar"));
                return;
            }

            keyValues.forEach(([k, v]) => {
                paramsString.push(`${k} = ?`);
                params.push(v);
            });

            params.push(id);

            db.get(
                `UPDATE users SET ${paramsString.join(", ")} `
                + "WHERE id = ? "
                + "RETURNING id as userID, email, name, password",
                params, (err: Error | null, row: User) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve({
                        userID: row.userID,
                        email: row.email,
                        name: row.name,
                        password: row.password
                    });
                }
            );
        });
    }
}
