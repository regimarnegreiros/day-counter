import type { Request, Response } from "express";
import { HTTPCodes } from "../utils/utils.ts";
import UserService from "../services/user.service.ts";

export default class UserController {
  static async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await UserService.signIn(email, password);
      return res.status(HTTPCodes.ok).json({ jwt_token: result.jwt_token });
    } catch (err: any) {
      return res.status(HTTPCodes.badRequest).json({ message: err.message });
    }
  }
  
  static async signUp(req: Request, res: Response) {
    try {
      const result = await UserService.signUp(req.body);
      return res.status(HTTPCodes.created).json({ jwt_token: result.jwt_token });
    } catch (err: any) {
      return res.status(HTTPCodes.badRequest).json({ message: err.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    if (typeof req.params.userId != "string") {
      return res.status(HTTPCodes.badRequest).json({ message: "invalid user" });
    }
    const { userId } = req.params;

    const authenticatedUser = req.body["userInfo"];
    const authUserId = authenticatedUser?.userID;
    if (!authUserId || authUserId !== userId) {
      return res.status(HTTPCodes.forbidden).json({ message: "Forbidden" });
    }
    try {
      await UserService.deleteUser(userId);
      return res.status(HTTPCodes.noContent).send();
    } catch (err: any) {
      console.error(err.stack);
      return res.status(HTTPCodes.badRequest).json({ message: err.message });
    }
  }

  static async userInfo(req: Request, res: Response) {
    if (typeof req.params.userId != "string") {
      return res.status(HTTPCodes.badRequest).json({ message: "invalid user" });
    }
    const { userId } = req.params;

    try {
      const user = await UserService.getUser(userId);
      if (!user) {
        return res.status(HTTPCodes.notFound).json({ message: "user not found" });
      }
      
      const { password, ...safeUser } = user;
      const responseUser = {
        ...safeUser,
      };
      
      return res.status(HTTPCodes.ok).json({ user: responseUser });
    } catch (err: any) {
      console.error(err.stack);
      return res.status(HTTPCodes.badRequest).json({ message: err.message });
    }
  }
  
  static async userAuthenticatedInfo(req: Request, res: Response) {
    const authenticatedUser = req.body["userInfo"];
    const authUserId = authenticatedUser?.userID;
    
    try {
      const user = await UserService.getUser(authUserId);
      if (!user) {
        return res.status(HTTPCodes.notFound).json({ message: "user not found" });
      }
      
      const { password, ...safeUser } = user;
      const responseUser = {
        ...safeUser,
      };
      
      return res.status(HTTPCodes.ok).json({ user: responseUser });
    } catch (err: any) {
      console.error(err.stack);
      return res.status(HTTPCodes.badRequest).json({ message: err.message });
    }
  }
}