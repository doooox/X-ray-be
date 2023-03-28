import express from "express"
import { loginUser, logoutUser, registerUser } from "../../controllers/Auth/authController"
import { authMiddleware } from "../../middleware/authMiddleware";

export const authRouter = express.Router()

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", authMiddleware, logoutUser)