import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/nextjs");
        console.log("Connected to DB");
    } catch (e) {
        console.error("error in connecting db: ", e);
    }
}