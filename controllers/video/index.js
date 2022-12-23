import catchAsyncError from "../../middleware/catchAsyncError.js";
import ErrorHandler from "../../utils/errorHandler.js";
import Video from '../../models/video/index.js'
import User from '../../models/user/index.js';

// When User try to addVideo our app fire this function
export const addVideo = catchAsyncError(async(req, res, next) => {
    if(!req.user) return;
    // Create New Video
    const newVideo = new Video({ userId: req.user._id, ...req.body });
    // Save Video
    const savedVideo = await newVideo.save();
    res.status(201).json({
        message:"Video Create Successfully",
        savedVideo
    })
})
// When User try to updateVideo our app fire this function
export const deleteVideo = catchAsyncError(async(req, res, next) => {
    const video = await Video.findById(req.params.id);
    if(!video) return next(new ErrorHandler("Video not found", 404));

    if(!req.user) return;
    if(req.user._id == video.userId){
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"Video Delete Successfully"
        });
    } else return next(new ErrorHandler("You are not author", 404));
})
// When User try to updateVideo our app fire this function
export const updateVideo = catchAsyncError(async(req, res, next) => {
    if(!req.user) return
    const video = await Video.findById(req.params.id);
    if(!video) return next(new ErrorHandler("Video not found", 404));
   if(req.user._id == video.userId){
        const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
            $set:req.body
        }, { new:true })

        res.status(200).json({
            message:"Update Video",
            updateVideo
        })
   } else return next(new ErrorHandler("You are not author", 400));
})
// When User try to updateVideo our app fire this function
export const getVideo = catchAsyncError(async(req, res, next) => {
    const video = await Video.findById(req.params.id);
    if(!video) return next(new ErrorHandler("Video not found", 404));
    res.status(200).json({
        video
    });

})
// When User try to updateVideo our app fire this function
export const addView = catchAsyncError(async(req, res, next) => {
     await Video.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1}
     });
    res.status(200).json({message: "The View Inc"});

})
// When User try to updateVideo our app fire this function
export const random = catchAsyncError(async(req, res, next) => {
    const videos = await Video.aggregate([{$sample: { size: 40}}]);
    if(!videos) return next(new ErrorHandler("Video not found", 404));
    res.status(200).json({videos});

})
// When User try to updateVideo our app fire this function
export const trend = catchAsyncError(async(req, res, next) => {
    const videos = await Video.find({}).sort({views: -1});
    if(!videos) return next(new ErrorHandler("Video not found", 404));
    res.status(200).json({videos});

})

// When User try to updateVideo our app fire this function
export const sub = catchAsyncError(async(req, res, next) => {
    if(!req.user) return;
    const user = await User.findById(req.user?._id);
    if(!user) return next(new ErrorHandler("Invalid User", 404));
    const subscribedChannels = user?.subscribedUsers;

    const list = await Promise.all(
        subscribedChannels?.map((channelId) => {
            return Video.find({userId: channelId})
        })
    )
    res.status(200).json({list:list.flat().sort((a, b) => b.createdAt - a.createdAt)});

})

// When User try to updateVideo our app fire this function
export const getByTag = catchAsyncError(async(req, res, next) => {
    if(!req.query.tags) return;
   const tags = req.query.tags;
   const searchText = tags.split(",");
   const videos = await Video.find({tags: { $in: searchText }}).limit(20);
   res.status(200).json(videos)

})
// When User try to updateVideo our app fire this function
export const search = catchAsyncError(async(req, res, next) => {
    if(!req.query) return;
   const query = req.query.q;
   const videos = await Video.find({ title: { $regex: query, $options:"i" }}).limit(40);
   res.status(200).json(videos)
})