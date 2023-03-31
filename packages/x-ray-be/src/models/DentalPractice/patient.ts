import mongoose from "mongoose";
import { IPatient } from "../../types/DentapPractice/patient.types";
import dentalPractice from "./dentalPractice";

const Schema = mongoose.Schema;

const patientSchema = new Schema<IPatient>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dentalPractice: {
        type: Schema.Types.ObjectId,
        ref: "DentalPractice"
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    }
},
    {
        timestamps: true,
    }
)

export default mongoose.model("Patient", patientSchema)