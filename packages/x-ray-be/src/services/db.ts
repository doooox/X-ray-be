import mongoose from "mongoose";

export const connectDB = async () => {

    const dbName = process.env.MONGO_URI;

    try {
        await mongoose.connect(dbName);
    } catch (error) {
        process.exit(1);
    }
};

