import mongoose from "mongoose";
import { IDentalPractice } from "../../types/DentapPractice/dentalPracitce.types";

const Schema = mongoose.Schema

const dentalPracticeSchema = new Schema<IDentalPractice>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    doctors: [{
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    }]
},
    {
        timestamps: true,
    })

export default mongoose.model("DentalPractice", dentalPracticeSchema)