"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
/* eslint-disable no-unused-vars */
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, require: true },
    post: {
        type: String,
    },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    activity: [
        {
            userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            comment: [{ type: String }],
            votes: { type: Boolean, default: false },
            _id: false,
        },
    ],
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Post category is required"],
        ref: "Category",
    },
    premium: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
postSchema.virtual("upVotes").get(function () {
    var _a;
    return (_a = this.activity) === null || _a === void 0 ? void 0 : _a.filter((act) => act.votes === true);
});
postSchema.virtual("downVotes").get(function () {
    var _a;
    return (_a = this.activity) === null || _a === void 0 ? void 0 : _a.filter((act) => act.votes === false);
});
postSchema.set("toJSON", { virtuals: true });
exports.Post = (0, mongoose_1.model)("Post", postSchema);
