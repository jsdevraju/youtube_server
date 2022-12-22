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
exports.search = exports.getByTag = exports.sub = exports.trend = exports.random = exports.addView = exports.getVideo = exports.updateVideo = exports.deleteVideo = exports.addVideo = void 0;
const catchAsyncError_1 = __importDefault(require("../../middleware/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const video_1 = __importDefault(require("../../models/video"));
const user_1 = __importDefault(require("../../models/user"));
// When User try to addVideo our app fire this function
exports.addVideo = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return;
    // Create New Video
    const newVideo = new video_1.default(Object.assign({ userId: req.user._id }, req.body));
    // Save Video
    const savedVideo = yield newVideo.save();
    res.status(201).json({
        message: "Video Create Successfully",
        savedVideo
    });
}));
// When User try to updateVideo our app fire this function
exports.deleteVideo = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const video = yield video_1.default.findById(req.params.id);
    if (!video)
        return next(new errorHandler_1.default("Video not found", 404));
    if (!req.user)
        return;
    if (req.user._id == video.userId) {
        yield video_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Video Delete Successfully"
        });
    }
    else
        return next(new errorHandler_1.default("You are not author", 404));
}));
// When User try to updateVideo our app fire this function
exports.updateVideo = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return;
    const video = yield video_1.default.findById(req.params.id);
    if (!video)
        return next(new errorHandler_1.default("Video not found", 404));
    if (req.user._id == video.userId) {
        const updateVideo = yield video_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json({
            message: "Update Video",
            updateVideo
        });
    }
    else
        return next(new errorHandler_1.default("You are not author", 400));
}));
// When User try to updateVideo our app fire this function
exports.getVideo = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const video = yield video_1.default.findById(req.params.id);
    if (!video)
        return next(new errorHandler_1.default("Video not found", 404));
    res.status(200).json({
        video
    });
}));
// When User try to updateVideo our app fire this function
exports.addView = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield video_1.default.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 }
    });
    res.status(200).json({ message: "The View Inc" });
}));
// When User try to updateVideo our app fire this function
exports.random = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const videos = yield video_1.default.aggregate([{ $sample: { size: 40 } }]);
    if (!videos)
        return next(new errorHandler_1.default("Video not found", 404));
    res.status(200).json({ videos });
}));
// When User try to updateVideo our app fire this function
exports.trend = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const videos = yield video_1.default.find({}).sort({ views: -1 });
    if (!videos)
        return next(new errorHandler_1.default("Video not found", 404));
    res.status(200).json({ videos });
}));
// When User try to updateVideo our app fire this function
exports.sub = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.user)
        return;
    const user = yield user_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!user)
        return next(new errorHandler_1.default("Invalid User", 404));
    const subscribedChannels = user === null || user === void 0 ? void 0 : user.subscribedUsers;
    const list = yield Promise.all(subscribedChannels === null || subscribedChannels === void 0 ? void 0 : subscribedChannels.map((channelId) => {
        return video_1.default.find({ userId: channelId });
    }));
    res.status(200).json({ list: list.flat().sort((a, b) => b.createdAt - a.createdAt) });
}));
// When User try to updateVideo our app fire this function
exports.getByTag = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.tags)
        return;
    const tags = req.query.tags;
    const searchText = tags.split(",");
    const videos = yield video_1.default.find({ tags: { $in: searchText } }).limit(20);
    res.status(200).json(videos);
}));
// When User try to updateVideo our app fire this function
exports.search = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query)
        return;
    const query = req.query.q;
    const videos = yield video_1.default.find({ title: { $regex: query, $options: "i" } }).limit(40);
    res.status(200).json(videos);
}));
