import catchAsyncError from "../../middleware/catchAsyncError.js";
import ErrorHandler from "../../utils/errorHandler.js";
import Comment from '../../models/comment/index.js'


// When User try to add comment our app fire this function
export const addComment = catchAsyncError(async(req, res, next) => {
    if(!req.user) return;
    const newComment = new Comment({...req.body, userId:req.user._id});
    const saveComment = await newComment.save();
    res.status(201).json(saveComment)
})
// When User try to delete comment our app fire this function
export const deleteComment = catchAsyncError(async(req, res, next) => {
    if(!req.user) return;
    const comment = await Comment.findById(req.params.id);
    if(!comment) return next(new ErrorHandler("Comment not found", 404));
    
    // All Condition Pass Then do this
    if(req.user._id == comment.userId){
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Comment has been delete"})
    } else return next(new ErrorHandler("You are author", 400));
})  

// When User try to getComments our app fire this function
export const getComments = catchAsyncError(async(req, res, next) => {
    const comments = await Comment.find({videoId: req.params.id});
    if(!comments) return next(new ErrorHandler("Video not found", 404));
    res.status(200).json(comments)
})

