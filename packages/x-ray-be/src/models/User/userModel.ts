import mongoose from "mongoose";
import { IUser } from "../../types/User/user.types";


const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model("User", userSchema)