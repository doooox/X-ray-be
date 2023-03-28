import express from "express"
import { authRouter } from "./Auth/authRoutes";

export const router = express.Router();

router.use("/auth", authRouter)