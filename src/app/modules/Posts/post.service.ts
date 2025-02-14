import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { TPost } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../User/user.modal";
import AppError from "../../errors/AppError";
import status from "http-status";

const makePostDb = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};
const getAllPost = async (query: Record<string, unknown>) => {
  const postQuerys = new QueryBuilder(
    Post.find({ isDeleted: false }).populate("userId").populate("category"),
    query
  )
    .search(["title", "post"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .premium();

  const result = await postQuerys.modelQuery;
  return result;
};

const getVoteSummeryDb = async (id: string) => {
  const result = await Post.aggregate([
    // Make sure to await the result
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $project: {
        _id: 0,
        upVotes: {
          $size: {
            $filter: {
              input: "$activity",
              as: "activity",
              cond: { $eq: ["$$activity.votes", true] },
            },
          },
        },
        downVotes: {
          $size: {
            $filter: {
              input: "$activity",
              as: "activity",
              cond: { $eq: ["$$activity.votes", false] },
            },
          },
        },
      },
    },
  ]);
  return result[0];
};

// get post by id
const getPostByidDb = async (id: string) => {
  return await Post.findById(id)
    .populate("userId")
    .populate("category")
    .populate("activity.userId")
    .sort("createdAt");
};
const getPostByUserIdDb = async (id: string) => {
  const result = await Post.find({ userId: id, isDeleted: false })
    .populate("userId")
    .populate("category")
    .populate("activity.userId");
  return result;
};
const handleVote = async (
  postId: string,
  payload: { userId: string; votes: boolean }
) => {
  const postExist = await Post.findById(postId);
  const userExist = await User.findById(payload.userId);
  if (!postExist || !userExist) {
    throw new AppError(status.NOT_FOUND, "Post or User not found");
  }
  const userAlreadyVoted = await Post.find({
    _id: postId,
    "activity.userId": payload.userId,
  });
  // console.log(userAlreadyVoted);
  if (!userAlreadyVoted.length) {
    // downvotes
    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { activity: { userId: payload.userId, votes: payload.votes } },
      },
      { new: true }
    );
    return { message: "voted successfully" };
  }
  await Post.findOneAndUpdate(
    { _id: postId, "activity.userId": payload.userId },
    { $set: { "activity.$.votes": payload.votes } },
    { new: true }
  );
  return { message: "voted successfully" };
};

const addComment = async (
  postId: string,
  payload: { userId: string; comment: string }
) => {
  const postExist = await Post.findById(postId);
  const userExist = await User.findById(payload.userId);
  // console.log(postExist, userExist);

  if (!postExist || !userExist) {
    throw new AppError(status.NOT_FOUND, "Post or User not found");
  }

  // Check if the user has already commented on the post
  const userAlreadyCommented = await Post.findOne({
    _id: postId,
    "activity.userId": payload.userId,
  });

  if (!userAlreadyCommented) {
    // If the user has not commented, push a new entry to the activity array
    await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          activity: { userId: payload.userId, comment: [payload.comment] },
        },
      },
      { new: true }
    );
    return { message: "Comment added successfully" };
  }

  // If the user has already commented, update their comment by appending the new one
  await Post.findOneAndUpdate(
    { _id: postId, "activity.userId": payload.userId },
    {
      $push: { "activity.$.comment": [payload.comment] }, // Overwrite the existing comment with a new one
    },
    { new: true }
  );

  return { message: "Comment updated successfully" };
};
const updatePostDb = async (postId: string, payload: TPost) => {
  const result = await Post.findByIdAndUpdate(postId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deletePost = async (postId: string) => {
  const result = await Post.findByIdAndUpdate(
    postId,
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};

const getTotalPostCount = async () => {
  return await Post.countDocuments({ isDeleted: { $ne: true } });
};
export const postService = {
  makePostDb,
  getAllPost,
  getVoteSummeryDb,
  getPostByidDb,
  getPostByUserIdDb,
  handleVote,
  addComment,
  updatePostDb,
  deletePost,
  getTotalPostCount,
};
