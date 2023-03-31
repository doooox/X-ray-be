import express from "express"
import { addDoctor, getDoctor } from "../../controllers/DentalPractice/doctorController"
import { authMiddleware } from "../../middleware/authMiddleware"

export const doctorRouter = express.Router()

doctorRouter.get("/:_id", authMiddleware, getDoctor)
doctorRouter.post("/create/:_id", authMiddleware, addDoctor);
