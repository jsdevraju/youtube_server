"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.google = exports.login = exports.register = void 0;
const catchAsyncError_1 = __importDefault(require("../../middleware/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../models/user"));
// When User try to register our app fire this function
exports.register = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(12);
    const hash = yield bcryptjs_1.default.hash(req.body.password, salt);
    const newUser = new user_1.default(Object.assign(Object.assign({}, req.body), { password: hash }));
    yield newUser.save();
    res.status(201).json({
        message: "Register Successfully",
    });
}));
// When User try to login our app fire this function
exports.login = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ name: req.body.name });
    // if not any user exits in out db
    if (!user)
        return next(new errorHandler_1.default("User not found", 404));
    // compare the password
    const hashPassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
    // if not any user exits in out db
    if (!hashPassword)
        return next(new errorHandler_1.default("Invalid Credentials", 400));
    // Generate Token
    const token = jsonwebtoken_1.default.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {
        expiresIn: "1d",
    });
    // Minimize Password
    const _a = user._doc, { password } = _a, otherInfo = __rest(_a, ["password"]);
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
}));
// When User try to google our app fire this function
exports.google = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (user) {
        // Generate Token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {
            expiresIn: "1d",
        });
        const userDoc = user._doc;
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
    else {
        const newUser = new user_1.default(Object.assign(Object.assign({}, req.body), { formGoogle: true }));
        const saveUser = yield newUser.save();
        // Generate Token
        const token = jsonwebtoken_1.default.sign({ id: saveUser._id }, `${process.env.JWT_SECRET}`, {
            expiresIn: "1d",
        });
        const userDoc = saveUser._doc;
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
}));
// When User try to logout our app fire this function
exports.logout = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
