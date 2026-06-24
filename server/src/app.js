import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOrigin = process.env.CORS_ORIGIN;
const allowedOrigins = corsOrigin && corsOrigin !== "*" 
    ? corsOrigin.split(",").map(origin => origin.trim()) 
    : "*";

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import 
import userRoutes from "./routes/user.routes.js"

//Routes declaration
app.use("/api/v1/users", userRoutes);


export { app };