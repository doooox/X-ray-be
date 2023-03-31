import mongoose from "mongoose";
import { IDoctor } from "../../types/DentapPractice/doctor.types";

const Schema = mongoose.Schema;

const doctorSchema = new Schema<IDoctor>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    dentalPractice: {
        type: Schema.Types.ObjectId,
        ref: "DentalPractice"
    },
    patients: [{
        type: Schema.Types.ObjectId,
        ref: "Patient"
    }]
},
    {
        timestamps: true,
    });

export default mongoose.model("Doctor", doctorSchema)