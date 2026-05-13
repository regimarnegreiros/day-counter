import { signIn, signUp, userInfo, deleteUser } from "../controllers/user.controller.ts";
import { Router } from "express";

export const userRoutes = Router();

userRoutes.post("/api/signup", signUp);

userRoutes.post("/api/signin", signIn);

userRoutes.get("/api/user/:id", userInfo);

userRoutes.delete("/api/users/:id", deleteUser);

