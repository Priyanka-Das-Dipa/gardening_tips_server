"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUpdateValidationSchema = exports.postValidationSchema = void 0;
const zod_1 = require("zod");
exports.postValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    post: zod_1.z.any(),
    userId: zod_1.z.string({ required_error: "User id required" }),
    activity: zod_1.z
        .array(zod_1.z.object({
        userId: zod_1.z
            .string()
            .min(1, "User ID is required for activity")
            .optional(),
        votes: zod_1.z.boolean().optional(),
        comment: zod_1.z.array(zod_1.z.string().min(1, "Comment is required")).optional(),
    }))
        .optional(),
    category: zod_1.z.string({ required_error: "Post category is required" }),
    premium: zod_1.z.boolean().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.postUpdateValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").optional(),
    post: zod_1.z.any().optional(),
    userId: zod_1.z.string({ required_error: "User id required" }).optional(),
    category: zod_1.z
        .string({ required_error: "Post category is required" })
        .optional(),
    premium: zod_1.z.boolean().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
