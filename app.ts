// import all lib
import express, { Request, Response} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { config } from "dotenv";
import errorHandler from './middleware/error'

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


// test route
app.get("/", (req:Request, res:Response) => {
  res.send("Hello Api Working")
})

// Routes
import auth from './routes/auth';
import comment from './routes/comment';
import video from './routes/video';
import user from './routes/user';
// Routes Middleware
app.use("/api/v1/auth", auth);
app.use("/api/v1/comment", comment);
app.use("/api/v1/video", video);
app.use("/api/v1/user", user);


// Middleware Error Handler
app.use(errorHandler)

export default app;
