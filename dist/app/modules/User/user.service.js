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
exports.userService = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_modal_1 = require("./user.modal");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const stripe = new stripe_1.default(config_1.default.stripe_secret_key);
// Payment
const confirmPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentId, price } = payload;
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: price * 100,
        currency: "usd",
        payment_method: paymentId,
        confirm: true,
        return_url: `${config_1.default.client_site_url}/success`,
    });
    return paymentIntent;
});
// all user
const getAllUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_modal_1.User.find({ isDeleted: false }), query)
        .filter()
        .sort()
        .fields()
        .fields();
    const result = userQuery.modelQuery;
    return result;
});
const getUserByEmail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_modal_1.User.findOne({ email: payload }).populate("following");
    return result;
});
// single user
const getUseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_modal_1.User.findById(id)
        .populate("following")
        .populate("follower");
    return result;
});
const addFollowerAndFollowing = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const followingUser = yield user_modal_1.User.findOne({ email: payload.email });
    const followedUser = yield user_modal_1.User.findById(payload.userId);
    if (!followingUser || !followedUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "One or more user not found");
    }
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        // check the the follower already following or not
        const alreadyFollowing = yield user_modal_1.User.findOne({
            _id: payload.userId,
            follower: followingUser._id,
        });
        // console.log(alreadyFollowing);
        // add to follower
        if (!alreadyFollowing) {
            yield user_modal_1.User.findByIdAndUpdate(payload.userId, { follower: followingUser === null || followingUser === void 0 ? void 0 : followingUser._id }, { new: true, upsert: true, session });
            // update who is following update his following
            yield user_modal_1.User.findOneAndUpdate({ email: payload.email }, { $addToSet: { following: payload.userId } }, { new: true, upsert: true, session });
            yield session.commitTransaction();
            yield session.endSession();
            return { message: "Following successfully!!!" };
        }
        else {
            // remove follower if already following or unfollow
            yield user_modal_1.User.findByIdAndUpdate(followedUser._id, { $pull: { follower: followingUser._id } }, { new: true, upsert: true, session });
            // remove form own following
            yield user_modal_1.User.findOneAndUpdate({ email: payload.email }, { $pull: { following: payload.userId } }, { new: true, upsert: true, session });
            yield session.commitTransaction();
            yield session.endSession();
            return { message: "Unfollow Successfull" };
        }
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to following!!!");
    }
});
const deleteUserDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    return yield user_modal_1.User.findByIdAndUpdate(id, { isDeleted: true }, { new: true, upsert: true });
});
const makeAdminUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_modal_1.User.findOne({ _id: id });
    if (!userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found or role not matched");
    }
    if ((userExist === null || userExist === void 0 ? void 0 : userExist.role) === "USER") {
        return yield user_modal_1.User.findByIdAndUpdate(id, { role: "ADMIN" }, { new: true, runValidators: true });
    }
    if ((userExist === null || userExist === void 0 ? void 0 : userExist.role) === "ADMIN") {
        return yield user_modal_1.User.findByIdAndUpdate(id, { role: "USER" }, { new: true, runValidators: true });
    }
});
// handle add friend and remove friend
const addFriendAndRemoveFriendDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const followingUser = yield user_modal_1.User.findOne({ email: payload.email });
    const followedUser = yield user_modal_1.User.findById(payload.userId);
    if (!followingUser || !followedUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "One or more user not found");
    }
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        // check the the follower already following or not
        const alreadyfriend = yield user_modal_1.User.findOne({
            _id: payload.userId,
            friends: followingUser._id,
        });
        // console.log(alreadyFollowing);
        // add to follower
        if (!alreadyfriend) {
            yield user_modal_1.User.findByIdAndUpdate(payload.userId, { follower: followingUser === null || followingUser === void 0 ? void 0 : followingUser._id }, { new: true, upsert: true, session });
            // update who is follwoing update his folloing
            yield user_modal_1.User.findOneAndUpdate({ email: payload.email }, { $addToSet: { following: payload.userId } }, { new: true, upsert: true, session });
            yield session.commitTransaction();
            yield session.endSession();
            return { message: "Following successfull" };
        }
        else {
            // remove follower if already following or unfollow
            yield user_modal_1.User.findByIdAndUpdate(followedUser._id, { $pull: { follower: followingUser._id } }, { new: true, upsert: true, session });
            // remove form own following
            yield user_modal_1.User.findOneAndUpdate({ email: payload.email }, { $pull: { following: payload.userId } }, { new: true, upsert: true, session });
            yield session.commitTransaction();
            yield session.endSession();
            return { message: "Unfollow Successfully!!" };
        }
        // eslint-disable-next-line no-unused-vars
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to following");
    }
});
exports.userService = {
    getAllUser,
    getUserByEmail,
    getUseById,
    addFollowerAndFollowing,
    confirmPayment,
    deleteUserDb,
    makeAdminUser,
    addFriendAndRemoveFriendDB,
};
