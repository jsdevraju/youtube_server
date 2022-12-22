"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1.default.Schema({
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
    formGoogle: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", exports.userSchema);
