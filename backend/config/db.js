import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
