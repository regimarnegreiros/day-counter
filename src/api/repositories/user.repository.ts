// in theory this class should call database functions that execute sql,
// but i think we should execute sql here to simplify.

import { DatabaseSingleton } from "../database/database.singleton.ts";

export class UserRepository{
    private constructor(){}

    static async deleteUser(id: string) {
        const db = DatabaseSingleton.getInstance();
        //db delete code
    }
    
    static async getUser(id: string){
        const db = DatabaseSingleton.getInstance();
        //db delete code
    }
    
    static async signIn(id: string){
        const db = DatabaseSingleton.getInstance();
        //db delete code
    }
    
    static async signOut(id: string){
        const db = DatabaseSingleton.getInstance();
        //db delete code
    }

}