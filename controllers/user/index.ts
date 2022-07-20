import catchAsyncError from "../../middleware/catchAsyncError";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../../utils/errorHandler";
import { IReqAuth, IUser } from "../../utils/interface";
import User from "../../models/user";
import Video from '../../models/video'

// When User try to update her/she own information fire this function
export const updateUser = catchAsyncError(
  async (req: IReqAuth, res: Response, next: NextFunction) => {
    // If no user exits
    if (!req.user) return;
    // if user id match then update the user
    else if (req.params.id == req.user._id) {
      const update = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
    //   Response Data
      res.status(200).json({
        message: "Update Successfully",
        update,
      });
    } else return next(new ErrorHandler("You can author this account", 403));
  }
);
// When User try to delete her/she own account fire this function
export const deleteUser = catchAsyncError(
  async (req: IReqAuth, res: Response, next: NextFunction) => {
    // If no user exits
    if (!req.user) return;
    // if user id match then delete the user
    else if (req.params.id == req.user._id) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Delete Successfully",
      });
    } else return next(new ErrorHandler("You can author this account", 403));
  }
);
// When User try to getUser fire this function
export const getUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user =  await User.findById(req.params.id);
    if(!user) return next(new ErrorHandler("User not found", 404)) 

    const { password, ...otherInfo } = user._doc as IUser;

    res.status(200).json({
        message:"tru",
        user:otherInfo
    })
  }
);
// When User try to subscribe fire this function
export const subscribe = catchAsyncError(
  async (req: IReqAuth, res: Response, next: NextFunction) => {
    if(!req.user) return;
    //If user req add subscribedUsers array
    await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id}
    }, { new:true });
    //Increment Subscriber List
    await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 }
    }, { new:true });

    res.status(200).json({
        message:"Subscribe Successfully"
    })
  }
);
// When User try to unsubscribe fire this function
export const unsubscribe = catchAsyncError(
  async (req: IReqAuth, res: Response, next: NextFunction) => {
    if(!req.user) return;
    //If user req add subscribedUsers array
    await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id}
    });
    //Decrement Subscriber List
    await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 }
    });

    res.status(200).json({
        message:"UnSubscribe Successfully"
    })
  }
);
// When User try to like fire this function
export const like = catchAsyncError(
  async (req: IReqAuth, res: Response, next: NextFunction) => {
    if(!req.user) return;
    const id = req.user._id;
    const videoId = req.params.id;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet:{ likes: id},
      $pull: { dislikes: id }
    })

    res.status(200).json({message:"The video has been liked"})
  }
);
// When User try to dislike fire this function
export const disLike = catchAsyncError(
  async (req: IReqAuth, res: Response, next: NextFunction) => {
    if(!req.user) return;
    const id = req.user._id;
    const videoId = req.params.id;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet:{ dislikes: id},
      $pull: { likes: id }
    })

    res.status(200).json({message:"The video has been Disliked"})
  }
);
