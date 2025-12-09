import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/nextjs");
        console.log("Connected to DB");
    } catch (e) {
        console.error("Error in connecting to DB", e);
    }
}