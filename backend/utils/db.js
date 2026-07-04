import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const LOG_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../debug-7985e6.log");
const writeLog = (payload) => fs.appendFileSync(LOG_PATH, JSON.stringify(payload) + "\n");

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri?.startsWith("mongodb://") && !uri?.startsWith("mongodb+srv://")) {
          
            throw new Error("Invalid MONGO_URI: use mongodb:// or mongodb+srv://");
        }
        await mongoose.connect(uri);
        
        console.log("mongodb connected successfully");
    } catch (error) {
      
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}
export default connectDB;