import express from "express";
import dotenv from "dotenv";
import propertiesRoutes from "./routes/properties-routes.js";
import usersRoutes from "./routes/users-routes.js";
import messagesRoutes from "./routes/messages-routes.js";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,  // allow only this origin
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], // allowed HTTP methods
    // credentials: true
}))

// API routes
app.use("/api", propertiesRoutes);
app.use("/api", usersRoutes);
app.use("/api", messagesRoutes);

// Connect to MongoDB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    })
});