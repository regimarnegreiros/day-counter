import { prisma } from "../database/database.ts";
import { type User, type SafeUser, type UserCard } from "../utils/utils.ts";
import validator from "validator";
import { v7 as UUIDv7 } from "uuid";

export default class UserRepository {
    private constructor() {}

    static async deleteUser(userID: string): Promise<boolean> {
        try {
            const result = await prisma.users.deleteMany({
                where: { id: userID }
            });
            return result.count > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    static async getUserByEmailOrId(
        emailOrId: string,
        getCards: boolean = false
    ): Promise<User | undefined> {
        if (!validator.isEmail(emailOrId) && !validator.isUUID(emailOrId)) {
            throw new Error("E-mail ou ID inválido");
        }
        try {
            const query = validator.isEmail(emailOrId) ? { email: emailOrId } : { id: emailOrId };
            if (getCards) {
                const userWithCards = await prisma.users.findUnique({
                    where: query,
                    include: { counters: true }
                });
                if (!userWithCards) return undefined;

                return {
                    userID: userWithCards.id,
                    email: userWithCards.email,
                    name: userWithCards.name,
                    password: userWithCards.password,
                    notification: userWithCards.notification,
                    cards: userWithCards.counters.map((c) => ({
                        cardID: c.id,
                        icon: c.icon,
                        title: c.title,
                        type: c.type,
                        start_date: c.start_date,
                        end_date: c.end_date ?? "",
                        description: c.description ?? "",
                        hue: c.hue,
                        notify_interval: c.notify_interval,
                    }))
                };
            } else {
                const justUser = await prisma.users.findUnique({
                    where: query
                });
                if (!justUser) return undefined;

                return {
                    userID: justUser.id,
                    email: justUser.email,
                    name: justUser.name,
                    password: justUser.password,
                    notification: justUser.notification
                };
            }
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }

    static async signIn(
        email: string, hashedPassword: string
    ): Promise<boolean> {
        try {
            const user = await prisma.users.findFirst({
                where: {
                    email,
                    password: hashedPassword,
                }
            });
            return !!user;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    static async signUp(
        name: string, email: string, hashedPassword: string
    ): Promise<SafeUser | undefined> {
        try {
            const user = await prisma.users.create({
                data: {
                    id: UUIDv7(),
                    name,
                    email,
                    password: hashedPassword,
                }
            });
            return {
                userID: user.id,
                name: user.name,
                email: user.email,
                notification: user.notification
            };
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }

    static async updateUserById(
        id: string,
        data: Omit<Partial<User>, "cards" | "userID">
    ): Promise<Omit<SafeUser, "cards"> | undefined> {
        if (Object.keys(data).length === 0) {
            throw new Error("Nenhum dado para atualizar");
        }
        try {
            const user = await prisma.users.update({
                where: { id },
                data: data as any,
            });
            return {
                userID: user.id,
                email: user.email,
                name: user.name,
                notification: user.notification,
            };
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }
}
