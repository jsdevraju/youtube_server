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
exports.disLike = exports.like = exports.unsubscribe = exports.subscribe = exports.getUser = exports.deleteUser = exports.updateUser = void 0;
const catchAsyncError_1 = __importDefault(require("../../middleware/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const user_1 = __importDefault(require("../../models/user"));
const video_1 = __importDefault(require("../../models/video"));
// When User try to update her/she own information fire this function
exports.updateUser = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // If no user exits
    if (!req.user)
        return;
    // if user id match then update the user
    else if (req.params.id == req.user._id) {
        const update = yield user_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        //   Response Data
        res.status(200).json({
            message: "Update Successfully",
            update,
        });
    }
    else
        return next(new errorHandler_1.default("You can author this account", 403));
}));
// When User try to delete her/she own account fire this function
exports.deleteUser = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // If no user exits
    if (!req.user)
        return;
    // if user id match then delete the user
    else if (req.params.id == req.user._id) {
        yield user_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Delete Successfully",
        });
    }
    else
        return next(new errorHandler_1.default("You can author this account", 403));
}));
// When User try to getUser fire this function
exports.getUser = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.params.id);
    if (!user)
        return next(new errorHandler_1.default("User not found", 404));
    const _a = user._doc, { password } = _a, otherInfo = __rest(_a, ["password"]);
    res.status(200).json({
        message: "tru",
        user: otherInfo
    });
}));
// When User try to subscribe fire this function
exports.subscribe = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return;
    //If user req add subscribedUsers array
    yield user_1.default.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id }
    }, { new: true });
    //Increment Subscriber List
    yield user_1.default.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 }
    }, { new: true });
    res.status(200).json({
        message: "Subscribe Successfully"
    });
}));
// When User try to unsubscribe fire this function
exports.unsubscribe = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return;
    //If user req add subscribedUsers array
    yield user_1.default.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id }
    });
    //Decrement Subscriber List
    yield user_1.default.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 }
    });
    res.status(200).json({
        message: "UnSubscribe Successfully"
    });
}));
// When User try to like fire this function
exports.like = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return;
    const id = req.user._id;
    const videoId = req.params.id;
    yield video_1.default.findByIdAndUpdate(videoId, {
        $addToSet: { likes: id },
        $pull: { dislikes: id }
    });
    res.status(200).json({ message: "The video has been liked" });
}));
// When User try to dislike fire this function
exports.disLike = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return;
    const id = req.user._id;
    const videoId = req.params.id;
    yield video_1.default.findByIdAndUpdate(videoId, {
        $addToSet: { dislikes: id },
        $pull: { likes: id }
    });
    res.status(200).json({ message: "The video has been Disliked" });
}));
