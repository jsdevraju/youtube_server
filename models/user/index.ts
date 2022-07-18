import mongoose from "mongoose";
import { IUser } from "../../utils/interface";

export const userSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/64/64572.png",
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
