import catchAsyncError from "../../middleware/catchAsyncError";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../../utils/errorHandler";

// When User try to register our app fire this function
export const createVideo = catchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    
})