import UserRepository from "../repositories/user.repository.ts";
import { hash, verifyHash } from "../hash.ts";
import validator from "validator";
import JWT from "../utils/jwt.singleton.ts";
import { User } from "../utils/utils.ts";

export default class UserService {
    private constructor() {}

    static async signUp(name: string, email: string, password: string) {
        if (!name || name.length < 3)
            throw new Error("O nome deve ter pelo menos 3 caracteres");

        if (!validator.isEmail(email))
            throw new Error("Formato de e-mail inválido");

        if (!password || password.length < 6)
            throw new Error("A senha deve ter pelo menos 6 caracteres");

        const existingUser = await UserRepository.getUserByEmailOrId(email);
        if (existingUser) throw new Error("E-mail já está em uso");

        const hashedPassword = await hash(password);
        const newUser = await UserRepository.signUp(name, email, hashedPassword);
        if (!newUser) throw new Error("Usuário não pôde ser cadastrado");

        const jwt_token = await JWT.sign({ userId: newUser.userID });
        return {jwt_token, user: {name: newUser.name, email: newUser.email }};
    }

    static async signIn(email: string, password: string){
        if (!validator.isEmail(email))
            throw new Error("Formato de e-mail inválido");
        if (!password)
            throw new Error("A senha não pode estar vazia");

        const user = await UserRepository.getUserByEmailOrId(email);
        if (!user) throw new Error("Credenciais inválidas");

        const isPasswordValid = await verifyHash(user.password, password);
        if (!isPasswordValid) throw new Error("Credenciais inválidas");

        const jwt_token = await JWT.sign({ userId: user.userID });
        return {jwt_token, user: {name: user.name, email: user.email }};
    }

    static async deleteUser(id: string) { 
        if (!validator.isUUID(id)) 
            throw new Error('ID inválido');

        try {
            await UserRepository.deleteUser(id);
        }
        catch (err: any) {
            console.error(err.stack);
            throw new Error('Algo deu errado.')
        }
    }

    static async getUser(id: string) {
        if (!validator.isUUID(id)) 
            throw new Error('ID inválido');

        return await UserRepository.getUserByEmailOrId(id);
    }

    static async updateUser(id: string, data: Omit<Partial<User>, "cards" | "userID">) {
        const dataCopy = { ...data };

        if (!validator.isUUID(id))
            throw new Error('ID inválido');

        if (data.email !== undefined) {
            if (!validator.isEmail(data.email))
                throw new Error("Formato de e-mail inválido");

            const existingUser = await UserRepository.getUserByEmailOrId(data.email);
            if (existingUser && existingUser.userID !== id)
                throw new Error("E-mail já está em uso");
        }

        if (data.name !== undefined && data.name.length < 3)
            throw new Error("O nome deve ter pelo menos 3 caracteres");

        if (data.password !== undefined) {
            if (data.password.length < 6)
                throw new Error("A senha deve ter pelo menos 6 caracteres");

            dataCopy.password = await hash(data.password);
        }

        return await UserRepository.updateUserById(id, dataCopy);
    }

}
