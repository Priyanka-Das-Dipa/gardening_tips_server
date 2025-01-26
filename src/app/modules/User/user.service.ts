/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import config from "../../config";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "./user.modal";
import AppError from "../../errors/AppError";
import status from "http-status";
import { startSession } from "mongoose";

const stripe = new Stripe(config.stripe_secret_key as string);

// Payment
const confirmPayment = async (payload: {
  paymentId: string;
  price: number;
}) => {
  const { paymentId, price } = payload;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price * 100,
    currency: "usd",
    payment_method: paymentId,
    confirm: true,
    return_url: `${config.client_site_url}/success`,
  });
  return paymentIntent;
};

// all user
const getAllUser = async (query: any) => {
  const userQuery = new QueryBuilder(User.find({ isDeleted: false }), query)
    .filter()
    .sort()
    .fields()
    .fields();
  const result = userQuery.modelQuery;
  return result;
};

const getUserByEmail = async (payload: string) => {
  const result = await User.findOne({ email: payload }).populate("following");
  return result;
};

// single user
const getUseById = async (id: string) => {
  const result = await User.findById(id)
    .populate("following")
    .populate("follower");
  return result;
};

const addFollowerAndFollowing = async (payload: {
  email: string;
  userId: string;
}) => {
  const followingUser = await User.findOne({ email: payload.email });
  const followedUser = await User.findById(payload.userId);
  if (!followingUser || !followedUser) {
    throw new AppError(status.NOT_FOUND, "One or more user not found");
  }

  const session = await startSession();
  try {
    session.startTransaction();
    // check the the follower already following or not
    const alreadyFollowing = await User.findOne({
      _id: payload.userId,
      follower: followingUser._id,
    });
    // console.log(alreadyFollowing);
    // add to follower
    if (!alreadyFollowing) {
      await User.findByIdAndUpdate(
        payload.userId,
        { follower: followingUser?._id },
        { new: true, upsert: true, session }
      );
      // update who is following update his following
      await User.findOneAndUpdate(
        { email: payload.email },
        { $addToSet: { following: payload.userId } },
        { new: true, upsert: true, session }
      );
      await session.commitTransaction();
      await session.endSession();
      return { message: "Following successfully!!!" };
    } else {
      // remove follower if already following or unfollow
      await User.findByIdAndUpdate(
        followedUser._id,
        { $pull: { follower: followingUser._id } },
        { new: true, upsert: true, session }
      );
      // remove form own following
      await User.findOneAndUpdate(
        { email: payload.email },
        { $pull: { following: payload.userId } },
        { new: true, upsert: true, session }
      );
      await session.commitTransaction();
      await session.endSession();
      return { message: "Unfollow Successfull" };
    }
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to following!!!");
  }
};
const deleteUserDb = async (id: string) => {
  console.log(id);
  return await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, upsert: true }
  );
};
const makeAdminUser = async (id: string) => {
  const userExist = await User.findOne({ _id: id });
  if (!userExist) {
    throw new AppError(status.NOT_FOUND, "User not found or role not matched");
  }
  if (userExist?.role === "USER") {
    return await User.findByIdAndUpdate(
      id,
      { role: "ADMIN" },
      { new: true, runValidators: true }
    );
  }
  if (userExist?.role === "ADMIN") {
    return await User.findByIdAndUpdate(
      id,
      { role: "USER" },
      { new: true, runValidators: true }
    );
  }
};

// handle add friend and remove friend
const addFriendAndRemoveFriendDB = async (payload: {
  email: string;
  userId: string;
}) => {
  const followingUser = await User.findOne({ email: payload.email });
  const followedUser = await User.findById(payload.userId);
  if (!followingUser || !followedUser) {
    throw new AppError(status.NOT_FOUND, "One or more user not found");
  }
  const session = await startSession();
  try {
    session.startTransaction();
    // check the the follower already following or not
    const alreadyfriend = await User.findOne({
      _id: payload.userId,
      friends: followingUser._id,
    });
    // console.log(alreadyFollowing);
    // add to follower
    if (!alreadyfriend) {
      await User.findByIdAndUpdate(
        payload.userId,
        { follower: followingUser?._id },
        { new: true, upsert: true, session }
      );
      // update who is follwoing update his folloing
      await User.findOneAndUpdate(
        { email: payload.email },
        { $addToSet: { following: payload.userId } },
        { new: true, upsert: true, session }
      );
      await session.commitTransaction();
      await session.endSession();
      return { message: "Following successfull" };
    } else {
      // remove follower if already following or unfollow
      await User.findByIdAndUpdate(
        followedUser._id,
        { $pull: { follower: followingUser._id } },
        { new: true, upsert: true, session }
      );
      // remove form own following
      await User.findOneAndUpdate(
        { email: payload.email },
        { $pull: { following: payload.userId } },
        { new: true, upsert: true, session }
      );
      await session.commitTransaction();
      await session.endSession();
      return { message: "Unfollow Successfully!!" };
    }
  // eslint-disable-next-line no-unused-vars
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to following");
  }
};

export const userService = {
  getAllUser,
  getUserByEmail,
  getUseById,
  addFollowerAndFollowing,
  confirmPayment,
  deleteUserDb,
  makeAdminUser,
  addFriendAndRemoveFriendDB,
};
