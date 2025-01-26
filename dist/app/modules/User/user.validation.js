"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, "Name is required"),
    role: zod_1.z.enum(["ADMIN", "USER"]).optional(),
    email: zod_1.z.string().email("Invalid email address"),
    follower: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId)).optional(),
    following: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId)).optional(),
    upVotesItem: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId)).optional(),
    downVotesItem: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId)).optional(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: zod_1.z.string().optional(),
    profilePhoto: zod_1.z.string().url("Invalid URL").optional(),
    friends: zod_1.z.object({
        type: zod_1.z.string(), // Assuming `type` is just a string representation of `ObjectId` for validation
        status: zod_1.z.enum(["confirmed", "pendding"]).default("pendding"),
    }),
});
const followUnfollowValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: "user id required" }),
        email: zod_1.z.string({ required_error: "email id required" }),
    }),
});
exports.userValidation = {
    followUnfollowValidationSchema,
};
