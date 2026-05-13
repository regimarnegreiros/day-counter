import { UserRepository } from "../repositories/user.repository.ts";
import { hash, verifyHash } from "../hash.ts";

export class UserService{
    private constructor(){}

    static async deleteUser(id: string){ 
        if(typeof id != 'string' || id.length != 36){
            throw new Error('invalid id');
        }
        try{
            UserRepository.deleteUser(id);
        }catch(err: any){
            console.error(err.stack);
            throw new Error('Something went wrong.')
        }
    }

    static async getUser(id: string){
        if(typeof id != 'string' || id.length != 36){
            throw new Error('invalid id');
        }
        return await UserRepository.getUser(id);
    }

    static async signIn(id: string){
        if(typeof id != 'string' || id.length != 36){
            throw new Error('invalid id');
        }
        return await UserRepository.signIn(id);
    }

    static async signOut(id: string){
        if(typeof id != 'string' || id.length != 36){
            throw new Error('invalid id');
        }
        return await UserRepository.getUser(id);
    }


}