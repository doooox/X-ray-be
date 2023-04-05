import express from "express"
import { addDoctor, getAllDoctors, getDoctor, getSearchedDoctor } from "../../controllers/DentalPractice/doctorController"
import { authMiddleware } from "../../middleware/authMiddleware"

export const doctorRouter = express.Router()

doctorRouter.get("/", authMiddleware, getAllDoctors)
doctorRouter.get("/search", authMiddleware, getSearchedDoctor)
doctorRouter.get("/:_id", authMiddleware, getDoctor)
doctorRouter.post("/create/:_id", authMiddleware, addDoctor);

