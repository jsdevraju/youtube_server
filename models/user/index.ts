import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  avatar: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/128/64/64572.png",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

export default mongoose.model("User", userSchema);
