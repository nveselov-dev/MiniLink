import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error("MongoDB URI is missing");
        }

        await mongoose.connect(mongoUri);
    }
    catch (error) {
        console.error("MongoDB connection error", error);
        throw error;
    }
}