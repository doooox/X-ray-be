import mongoose from "mongoose";
import { IXrayImage } from "../../types/DentapPractice/xRayImage.types";

const Schema = mongoose.Schema

const xRaySchema = new Schema<IXrayImage>({
    xRay: {
        type: String,
        required: true
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: "Patient"
    }
}, {
    timestamps: true,
})

export default mongoose.model("xRayImage", xRaySchema)