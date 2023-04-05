import express from 'express'
import { addPatient, getAllPatients, getPatietnt, getSerchedPatient } from '../../controllers/DentalPractice/patientController';
import { authMiddleware } from '../../middleware/authMiddleware';

export const patientRouter = express.Router();

patientRouter.get("/", authMiddleware, getAllPatients)
patientRouter.get("/search", authMiddleware, getSerchedPatient)
patientRouter.get("/:_id", authMiddleware, getPatietnt)
patientRouter.post("/create/:_id", authMiddleware, addPatient)