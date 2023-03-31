import express from 'express'
import { addPatient, getPatietnt } from '../../controllers/DentalPractice/patientController';
import { authMiddleware } from '../../middleware/authMiddleware';

export const patientRouter = express.Router();

patientRouter.get("/:_id", authMiddleware, getPatietnt)
patientRouter.post("/create/:_id", authMiddleware, addPatient)