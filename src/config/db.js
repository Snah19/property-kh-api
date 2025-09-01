import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully!");
    }
    catch (error) {
        console.log("Unable to connect to MongoDB:", error.message);
        process.exit(1); // means exit with failure, 0 means success
    }
};

export default connectDB;