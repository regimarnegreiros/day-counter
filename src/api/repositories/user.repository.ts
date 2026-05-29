// in theory this class should call database functions that execute sql,
// but i think we should execute sql here to simplify.

import { type Database } from "sqlite3";
import { DatabaseSingleton } from "../database/database.singleton.ts";
import { hash } from "../hash.ts";
import { Card, User, SafeUser, UserCard, Resolver, Rejector } from "../utils.ts";
import { isEmail } from "validator";
import { v7 as UUIDv7 } from "uuid";


function getUserWithCards(
    db: Database, email: string, hashedPassword: string,
    resolve: Resolver<SafeUser | undefined>, reject: Rejector
) {
    const userQuery = "u.id as userID, u.name, u.email";
    const cardQuery = (
        "c.id as cardID, c.icon, c.title, c.type,"
        + "c.start_date, c.end_date, c.description, "
        + "c.hue, c.notify_interval"
    );
    const query = (`SELECT ${userQuery}, ${cardQuery} `
        + "FROM users u JOIN counters c ON u.id = c.user_id "
        + "WHERE u.email = ? AND u.password = ?");
    db.all(query, [email, hashedPassword], (err, rows) => {
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
        const queryCast = rows as Array<SafeUser & NullableUserCard>;
        const value: SafeUser = {
            userID: queryCast[0].userID,
            email: queryCast[0].email,
            name: queryCast[0].name,
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
    db: Database, email: string, hashedPassword: string,
    resolve: Resolver<SafeUser | undefined>, reject: Rejector
) {
    const query = (
        "SELECT u.id as userID, u.name, u.email FROM users u "
      + "WHERE u.email = ? AND u.password = ?"
    );

    db.get(query, [email, hashedPassword], (err, row) => {
        if (err) {
            reject(err);
            return;
        }

        resolve(row as SafeUser | undefined);
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

    static async getUser(email: string, password: string,
        getCards?: boolean
    ): Promise<SafeUser | undefined> {
        if (!isEmail(email)) throw new Error("e-mail invalido");

        const db = DatabaseSingleton.getInstance();
        const hashedPassword = await hash(password);

        return new Promise<SafeUser | undefined>((resolve, reject) => {
            if (getCards)
                getUserWithCards(db, email, hashedPassword, resolve, reject);
            else
                getOnlyUser(db, email, hashedPassword, resolve, reject);
        });
    }

    static async signIn(email: string, password: string): Promise<boolean> {
        // no AsyncStorage criar chave "validDate", e valor validade de X horas
        // ao entrar no app, compara timestamp com validDate para relogar ou nao

        return (await UserRepository.getUser(email, password)) !== undefined;
    }

    static async signUp(
        name: string, email: string, password: string
    ): Promise<boolean> {
        const db = DatabaseSingleton.getInstance();
        const hashedPassword = await hash(password);

        return new Promise<boolean>((resolve, reject) => {
            db.run("INSERT INTO users VALUES (?, ?, ?, ?)",
                [UUIDv7(), name, email, hashedPassword],
                function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(this.changes > 0);
                }
            )
        });
    }
}