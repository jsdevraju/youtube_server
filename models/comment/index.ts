import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId:{
        type:String,
        required: true,
    },
    desc:{
        type:String,
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
