import mongoose from "mongoose";

export const connectDB = async () => {
    const dbName = process.env.MOGNO_URI
    try {
        await mongoose.connect(dbName);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
