import sqlite3, { type Database } from "sqlite3"

export class DatabaseSingleton{
    private static db: Database
    private constructor(path:string){
        if(!DatabaseSingleton.db) DatabaseSingleton.db = new sqlite3.Database(path);        
    }
    static setInstance(path:string){
        if(typeof path != 'string' || path.length === 0){
            throw new Error('Invalid path');
        }
        new DatabaseSingleton(path);
    }
    static getInstance(){
        if(!DatabaseSingleton.db) throw new Error('Database haven\'t been inicialized');
        return DatabaseSingleton.db;
    }

}