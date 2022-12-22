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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.deleteComment = exports.addComment = void 0;
const catchAsyncError_1 = __importDefault(require("../../middleware/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const comment_1 = __importDefault(require("../../models/comment"));
// When User try to add comment our app fire this function
exports.addComment = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return;
    const newComment = new comment_1.default(Object.assign(Object.assign({}, req.body), { userId: req.user._id }));
    const saveComment = yield newComment.save();
    res.status(201).json(saveComment);
}));
// When User try to delete comment our app fire this function
exports.deleteComment = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return;
    const comment = yield comment_1.default.findById(req.params.id);
    if (!comment)
        return next(new errorHandler_1.default("Comment not found", 404));
    // All Condition Pass Then do this
    if (req.user._id == comment.userId) {
        yield comment_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Comment has been delete" });
    }
    else
        return next(new errorHandler_1.default("You are author", 400));
}));
// When User try to getComments our app fire this function
exports.getComments = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield comment_1.default.find({ videoId: req.params.id });
    if (!comments)
        return next(new errorHandler_1.default("Video not found", 404));
    res.status(200).json(comments);
}));
