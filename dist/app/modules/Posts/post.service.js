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
exports.postService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const post_model_1 = require("./post.model");
const user_modal_1 = require("../User/user.modal");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const makePostDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.create(payload);
    return result;
});
const getAllPost = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const postQuerys = new QueryBuilder_1.default(post_model_1.Post.find({ isDeleted: false }).populate("userId").populate("category"), query)
        .search(["title", "post"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .premium();
    const result = yield postQuerys.modelQuery;
    return result;
});
const getVoteSummeryDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.aggregate([
        // Make sure to await the result
        { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } },
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
});
// get post by id
const getPostByidDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield post_model_1.Post.findById(id)
        .populate("userId")
        .populate("category")
        .populate("activity.userId")
        .sort("createdAt");
});
const getPostByUserIdDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.find({ userId: id, isDeleted: false })
        .populate("userId")
        .populate("category")
        .populate("activity.userId");
    return result;
});
const handleVote = (postId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const postExist = yield post_model_1.Post.findById(postId);
    const userExist = yield user_modal_1.User.findById(payload.userId);
    if (!postExist || !userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post or User not found");
    }
    const userAlreadyVoted = yield post_model_1.Post.find({
        _id: postId,
        "activity.userId": payload.userId,
    });
    // console.log(userAlreadyVoted);
    if (!userAlreadyVoted.length) {
        // downvotes
        yield post_model_1.Post.findByIdAndUpdate(postId, {
            $push: { activity: { userId: payload.userId, votes: payload.votes } },
        }, { new: true });
        return { message: "voted successfully" };
    }
    yield post_model_1.Post.findOneAndUpdate({ _id: postId, "activity.userId": payload.userId }, { $set: { "activity.$.votes": payload.votes } }, { new: true });
    return { message: "voted successfully" };
});
const addComment = (postId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const postExist = yield post_model_1.Post.findById(postId);
    const userExist = yield user_modal_1.User.findById(payload.userId);
    if (!postExist || !userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post or User not found");
    }
    // Check if the user has already commented on the post
    const userAlreadyCommented = yield post_model_1.Post.findOne({
        _id: postId,
        "activity.userId": payload.userId,
    });
    if (!userAlreadyCommented) {
        // If the user has not commented, push a new entry to the activity array
        yield post_model_1.Post.findByIdAndUpdate(postId, {
            $push: {
                activity: { userId: payload.userId, comment: [payload.comment] },
            },
        }, { new: true });
        return { message: "Comment added successfully" };
    }
    // If the user has already commented, update their comment by appending the new one
    yield post_model_1.Post.findOneAndUpdate({ _id: postId, "activity.userId": payload.userId }, {
        $push: { "activity.$.comment": [payload.comment] }, // Overwrite the existing comment with a new one
    }, { new: true });
    return { message: "Comment updated successfully" };
});
const updatePostDb = (postId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findByIdAndUpdate(postId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findByIdAndUpdate(postId, { isDeleted: true }, { new: true, runValidators: true });
    return result;
});
const getTotalPostCount = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield post_model_1.Post.countDocuments({ isDeleted: { $ne: true } });
});
exports.postService = {
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
