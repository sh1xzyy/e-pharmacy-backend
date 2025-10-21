import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { loginController, registerController } from "../controllers/auth.js";

export const authRouter = Router();

authRouter.post("/register", ctrlWrapper(registerController));

authRouter.post("/login", ctrlWrapper(loginController));
