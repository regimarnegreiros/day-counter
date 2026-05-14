import type { Request, Response } from "express";
import { HTTPCodes } from "../utils.ts";
import UserService from "../services/user.service.ts";

export default class UserController {
  static async signIn(req: Request, res: Response) {
    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
  }

  static async signUp(req: Request, res: Response) {
    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
  }

  static async deleteUser(req: Request, res: Response) {
    if (typeof req.params.userId != "string") {
      return res.status(HTTPCodes.badRequest).send({ message: "invalid user" });
    }
    const { userId } = req.params;

    try {
      await UserService.deleteUser(userId);
    } catch (err: any) {
      console.error(err.stack);
      return res.status(HTTPCodes.badRequest).send({ message: "invalid user" }); //have to be changed
    }

    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
  }

  static async userInfo(req: Request, res: Response) {
    if (typeof req.params.userId != "string") {
      return res.status(HTTPCodes.badRequest).send({ message: "invalid user" });
    }

    const { userId } = req.params;
    try {
      const user = await UserService.getUser(userId);
    } catch (err: any) {
      console.error(err.stack);
      return res.status(HTTPCodes.badRequest).send({ message: "invalid user" }); //have to be changed
    }

    res.status(HTTPCodes.ok).send({
      user: "david",
      age: 21,
    });
  }
}
