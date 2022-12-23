// import all lib
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { config } from "dotenv";
import errorHandler from './middleware/error.js'

// Environment Variable Configuration
config();

// Define Application Entry point app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://youtube-client-alpha.vercel.app"],
  })
);
app.use(morgan("dev"));
app.use(cookieParser());


// test route
app.get("/", (req, res) => {
  res.json({ message: "Api Working.......Happy Hacking"})
})

// Routes
import auth from './routes/auth/index.js';
import comment from './routes/comment/index.js';
import video from './routes/video/index.js';
import user from './routes/user/index.js';
// Routes Middleware
app.use("/api/v1/auth", auth);
app.use("/api/v1/comment", comment);
app.use("/api/v1/video", video);
app.use("/api/v1/user", user);


// Middleware Error Handler
app.use(errorHandler)

export default app;
