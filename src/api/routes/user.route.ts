import { UserController } from "../controllers/user.controller.ts";
import { Router } from "express";

export const userRoutes = Router();

userRoutes.post("/api/signup", UserController.signUp);

userRoutes.post("/api/signin", UserController.signIn);

userRoutes.get("/api/user/:id", UserController.userInfo);

userRoutes.delete("/api/users/:id", UserController.deleteUser);

