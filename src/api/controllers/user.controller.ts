import type { Request, Response } from "express";
import { HTTPCodes } from "../utils.ts";
import { UserService } from "../services/user.service.ts";

export class UserController {
  static async signIn(req: Request, res: Response) {
    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
  }

  static async signUp(req: Request, res: Response) {
    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
  }

  static async deleteUser(req: Request, res: Response) {
    if (typeof req.params.id != "string") {
      return res.status(HTTPCodes.badRequest).send({ message: "invalid user" });
    }
    const { id } = req.params;

    try {
      UserService.deleteUser(id);
    } catch (err: any) {
      console.error(err.stack);
      return res.status(HTTPCodes.badRequest).send({ message: "invalid user" }); //have to be changed
    }

    res.status(HTTPCodes.notImplemented).send({ status: "not implemented" }); // TODO
  }

  static async userInfo(req: Request, res: Response) {
    if (typeof req.params.id != "string") {
      return res.status(HTTPCodes.badRequest).send({ message: "invalid user" });
    }

    const { id } = req.params;

    try {
      const user = UserService.getUser(id);
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
