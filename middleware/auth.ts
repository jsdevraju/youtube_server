import catchAsyncError from "./catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import { Response, NextFunction } from "express";
import { IReqAuth } from "../utils/interface";

export const isAuthenticated = catchAsyncError(
  async (req: IReqAuth, res: Response, next: NextFunction) => {
    const token =
      req.headers.authorization?.split("Bearer ")[1] || req.cookies.token;

    if (!token)
      return next(
        new ErrorHandler("Invalid authorization token. please try again", 400)
      );

    const decoded = jwt.verify(
      token,
      `${process.env.JWT_SECRET}`
    ) as JwtPayload;

    const user = await User.findById(decoded.id);
    if (!user)
      return next(
        new ErrorHandler("Invalid authorization token. please try again", 400)
      );

    req.user = user;

    next();
  }
);
