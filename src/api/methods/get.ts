import sqlite3 from 'sqlite3';
const { Database } = sqlite3;
import { databaseHealthCheck, HTTPCodes } from '../utils.ts';
import { Request, Response } from 'express';

type Database = sqlite3.Database;

export function health(_req: Request, res: Response) {
  if (process.uptime() < 1) // So services have time to start
    return res.status(HTTPCodes.serviceUnavailable).send({ status: "starting" });

  res.status(HTTPCodes.ok).send({ status: "ok" });
}

export async function DBReady(res: Response, db: Database) {
  const dbOK: boolean = await databaseHealthCheck(db);

  if (!dbOK) return res.status(HTTPCodes.serviceUnavailable).send({
    status: "degraded",
    database: "down"
  });

  res.status(HTTPCodes.ok).send({
    status: "ok",
    database: "up"
  });

}

export async function userInfo(req: Request, res: Response) {
  const { id } = req.params;

  res.status(HTTPCodes.ok).send({
    'user': 'david',
    'age': 21
  });
}

