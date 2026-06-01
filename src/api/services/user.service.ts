import UserRepository from "../repositories/user.repository.ts";
import { hash, verifyHash } from "../hash.ts";
import { isValidUUID } from "../utils/isValidUUID.ts"; 
import validator from "validator";
import JWT from "../utils/jwt.singleton.ts";

export default class UserService{
    private constructor(){}

    static async signUp(name: string, email: string, password: string){
        if (!name || name.length < 3) throw new Error("O nome deve ter pelo menos 3 caracteres");
        if (!validator.isEmail(email)) throw new Error("Formato de e-mail inválido");
        if (!password || password.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres");
        const existingUser = await UserRepository.getUserByEmail(email); // Implementar o getUserByEmail no repository
        if (existingUser) throw new Error("E-mail já está em uso")
        const hashedPassword = await hash(password);
        const newUser = await UserRepository.signUp(name, email, hashedPassword); // Tem que implementar que depois que ele criar o user ele retorna ele
        const jwt_token = await JWT.sign({ userId: newUser.userID });
        return {jwt_token, user: {name: newUser.name, email: newUser.email }};
    }

    static async signIn(email: string, password: string){
        if (!validator.isEmail(email)) throw new Error("Formato de e-mail inválido");
        if (!password) throw new Error("A senha não pode estar vazia");
        const user = await UserRepository.getUserByEmail(email);
        if (!user) throw new Error("Credenciais inválidas");
        const isPasswordValid = await verifyHash(user.password, password);
        if (!isPasswordValid) throw new Error("Credenciais inválidas");
        const jwt_token = await JWT.sign({ userId: user.userID });
        return {jwt_token, user: {name: user.name, email: user.email }};
    }

    static async deleteUser(id: string){ 
        if(!isValidUUID(id)){
            throw new Error('ID inválido');
        }
        try{
            await UserRepository.deleteUser(id);
        }catch(err: any){
            console.error(err.stack);
            throw new Error('Algo deu errado.')
        }
    }

    static async getUser(id: string){
        if(!isValidUUID(id)){
            throw new Error('ID inválido');
        }
        return await UserRepository.getUserById(id);
    }

    static async updateUserName(id: string, name: string){
        if(!isValidUUID(id)) throw new Error('ID inválido');
        if (!name || name.length < 3) throw new Error("O nome deve ter pelo menos 3 caracteres");
        return await UserRepository.updateName(id, name);
    }

    static async changePassword(id: string, password: string){
        if(!isValidUUID(id)) throw new Error('ID inválido');
        if (!password || password.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres");
        const hashedPassword = await hash(password);
        return await UserRepository.updatePassword(id, hashedPassword);
    }

    static async changeEmail(id: string, email: string){
        if(!isValidUUID(id)) throw new Error('ID inválido');
        if (!validator.isEmail(email)) throw new Error("Formato de e-mail inválido");
        const existingUser = await UserRepository.getUserByEmail(email);
        if (existingUser && existingUser.userID !== id) throw new Error("E-mail já está em uso");
        return await UserRepository.updateEmail(id, email);
    }
}