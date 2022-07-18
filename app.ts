// import all lib
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { config } from "dotenv";

// Environment Variable Configuration
config();

// Define Application Entry point app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://razuislam.youtube.vercle.app"],
  })
);
app.use(morgan("dev"));
app.use(cookieParser());


// Routes

// Middleware Error Handler

export default app;
