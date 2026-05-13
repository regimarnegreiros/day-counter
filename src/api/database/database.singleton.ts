import sqlite3, { type Database } from "sqlite3";

export class DatabaseSingleton {
  private static db: Database;
  private constructor(path: string) {
    if (!DatabaseSingleton.db)
      DatabaseSingleton.db = new sqlite3.Database(path, (err) => {
        if (err) {
          throw new Error("\x1b[0;31mfailed\x1b[0m to start database");
        }
        console.log(`database \x1b[0;32mconnected\x1b[0m on ${path}`);
      });
      DatabaseSingleton.db.run('PRAGMA foreign_keys = ON;',(err)=>{
        if(err){
            throw new Error('\x1b[0;31mfailed\x1b[0m to turn on the foreign_keys');
        }
        console.log('pragma \x1b[0;32mon\x1b[0m.')
      })
  }
  static setInstance(path: string) {
    if (typeof path != "string" || path.length === 0) {
      throw new Error("Invalid path");
    }
    new DatabaseSingleton(path);
  }
  static getInstance() {
    if (!DatabaseSingleton.db)
      throw new Error("Database haven't been inicialized");
    return DatabaseSingleton.db;
  }
}
