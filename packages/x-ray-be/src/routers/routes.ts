import express from "express"
import { authRouter } from "./Auth/authRoutes";
import { dentalPracticeRouter } from "./DentalPractice/dentalPracticeRoute";
import { doctorRouter } from "./DentalPractice/doctorRoute";
import { patientRouter } from "./DentalPractice/patientRoute";
import { xRayImageRouter } from "./DentalPractice/xRayImageRoute";

export const router = express.Router();

router.use("/auth", authRouter)
router.use("/dpractice", dentalPracticeRouter)
router.use("/doctor", doctorRouter)
router.use("/patient", patientRouter)
router.use("/xray", xRayImageRouter)