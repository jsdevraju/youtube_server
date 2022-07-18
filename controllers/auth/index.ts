import catchAsyncError from "../../middleware/catchAsyncError";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../../utils/errorHandler";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

// When User try to register our app fire this function
export const register = catchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    
})