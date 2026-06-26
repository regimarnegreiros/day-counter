import { Router } from "express";
import UserController from "../controllers/user.controller.ts";

export const userRoutes = Router();

userRoutes.post("/signup", UserController.signUp);

userRoutes.post("/signin", UserController.signIn);

userRoutes.get("/user/", UserController.userAuthenticatedInfo);

userRoutes.get("/user/:userId", UserController.userInfo);

userRoutes.put("/user/:userId", UserController.userUpdate);

userRoutes.delete("/user/:userId", UserController.deleteUser);

userRoutes.patch("/user/", UserController.changePassword);