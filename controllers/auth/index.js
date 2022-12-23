import catchAsyncError from "../../middleware/catchAsyncError.js";
import ErrorHandler from "../../utils/errorHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user/index.js";

// When User try to register our app fire this function
export const register = catchAsyncError(
  async (req, res, next) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(201).json({
      message: "Register Successfully",
    });
  }
);
// When User try to login our app fire this function
export const login = catchAsyncError(
  async (req, res, next) => {
    const user = await User.findOne({ name: req.body.name });
    // if not any user exits in out db
    if (!user) return next(new ErrorHandler("User not found", 404));
    // compare the password
    const hashPassword = await bcrypt.compare(req.body.password, user.password);
    // if not any user exits in out db
    if (!hashPassword)
      return next(new ErrorHandler("Invalid Credentials", 400));
    // Generate Token
    const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "1d",
    });

    // Minimize Password
    const { password, ...otherInfo } = user._doc

    // store cookie and send response
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        user: otherInfo,
        token,
        message: "Login Successfully",
      });
  }
);
// When User try to google our app fire this function
export const google = catchAsyncError(
  async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // Generate Token
      const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {
        expiresIn: "1d",
      });

      const userDoc = user._doc

      // store cookie and send response
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          user: userDoc,
          token,
          message: "Login Successfully",
        });
    } else {
      const newUser = new User({
        ...req.body,
        formGoogle: true,
      });

      const saveUser = await newUser.save();
      // Generate Token
      const token = jwt.sign(
        { id: saveUser._id },
        `${process.env.JWT_SECRET}`,
        {
          expiresIn: "1d",
        }
      );

      const userDoc = saveUser._doc

      // store cookie and send response
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          user: userDoc,
          token,
          message: "Login Successfully",
        });
    }
  }
);
// When User try to logout our app fire this function
export const logout = catchAsyncError(
  async (req, res, next) => {
    res
      .clearCookie("token", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "Logged Our Successfully",
        token: null,
        user: null,
      });
  }
);
