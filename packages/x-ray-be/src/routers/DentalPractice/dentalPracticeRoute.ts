import express from "express"
import { addDentalPractice, getAllDentalPractices, getSingleDentalPractice } from "../../controllers/DentalPractice/dentalPracticesController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const dentalPracticeRouter = express.Router();

dentalPracticeRouter.get("/", authMiddleware, getAllDentalPractices);
dentalPracticeRouter.get("/:_id", authMiddleware, getSingleDentalPractice);
dentalPracticeRouter.post("/create", authMiddleware, addDentalPractice);