import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
        console.error("Message:", error.message);
    console.error("Cause:", error.cause);
    }
}
export default connectDB;