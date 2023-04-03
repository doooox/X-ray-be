import express from "express"
import { authMiddleware } from "../../middleware/authMiddleware";
import { getXRayImage, uploadXRayImage } from "../../controllers/DentalPractice/xRayImageController";
import { upload } from "../../utils/static";

export const xRayImageRouter = express.Router();



xRayImageRouter.get("/:_id", authMiddleware, getXRayImage);
xRayImageRouter.post("/add/:_id", authMiddleware, upload.single("xRay"), uploadXRayImage);

