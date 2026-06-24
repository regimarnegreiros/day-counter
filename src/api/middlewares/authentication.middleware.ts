import type { Request, Response, NextFunction } from "express";
import { HTTPCodes, isPublicRoute } from "../utils/utils.ts";
import JWT from "../utils/jwt.singleton.ts";
import UserService from "../services/user.service.ts";
import { type JWTPayload } from "jose";
import CardRepository from "../repositories/card.repository.ts";

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (isPublicRoute(req.url)) return next();
  const auth_header = req.headers["authorization"];
  if (!auth_header)
    return res
      .status(HTTPCodes.unauthorized)
      .json({ message: "Not Authenticated" });
  const split_header = auth_header.split(" ");
  if (split_header.length != 2 || split_header[0] != "Bearer") {
    return res
      .status(HTTPCodes.unauthorized)
      .json({ message: "invalid token" });
  }
  const jwt_token = split_header[1];
  let payload_try: JWTPayload;
  try {
    payload_try = await JWT.verify(jwt_token);
  } catch (err: any) {
    console.error(err);
    if (err.message === "signature verification failed")
      return res
        .status(HTTPCodes.unauthorized)
        .json({ message: "invalid token" });
    else if (err.message === "Expired Token")
      return res
        .status(HTTPCodes.unauthorized)
        .json({ message: "Expired Token" });
    else {
      return res
        .status(HTTPCodes.internalError)
        .json({ message: "Something went wrong with authentication" });
    }
  }
  const payload = payload_try;
  const userId = payload["userID"];
  if (typeof userId !== "string") {
    return res.status(HTTPCodes.notFound).json({ message: "user not found" });
  }
  let user_try;
  try {
    user_try = await UserService.getUser(userId);
  } catch (err: any) {
    return res.status(HTTPCodes.notFound).json({ message: "user not found" });
  }
  const user = user_try;
  if (!user) {
    return res.status(HTTPCodes.notFound).json({ message: "user not found" });
  }
  if (!req.body) {
    req.body = { userInfo: user };
  } else {
    req.body["userInfo"] = user;
  }
  next();
}
