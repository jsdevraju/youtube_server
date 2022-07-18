import { Document } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  subscribers: number;
  subscribedUsers:string[];
  createdAt: string;
  updatedAt: string;
  _doc: object;
  __v: string;
}

export interface IReqAuth extends Request {
  user?: IUser;
}