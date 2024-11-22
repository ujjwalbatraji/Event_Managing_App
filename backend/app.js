import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import messageRouter from "./router/messageRouter.js";
import cors from "cors";

const app = express();

// Load environment variables from config.env
dotenv.config({ path: "./config/config.env" });


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
}))


// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is up and running!" });
});

// Routes
app.use("/api/v1/message", messageRouter);

// Database Connection
dbConnection();

export default app;