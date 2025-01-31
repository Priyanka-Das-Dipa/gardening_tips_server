"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
// import { USER_ROLE } from "../User/user.constant";
// import mongoose from "mongoose";
const registerUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        // role: z.nativeEnum(USER_ROLE).optional(),
        email: zod_1.z.string().email("Invalid email address"),
        // follower: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
        // following: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
        // upVotesItem: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
        // downVotesItem: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        // verified: z.boolean().optional(),
        profilePhoto: zod_1.z.string().optional(),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").optional(),
        phoneNumber: zod_1.z.string().optional(),
        profilePhoto: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        // links: z
        //   .array(
        //     z
        //       .object({
        //         socialName: z.string().optional(),
        //         url: z.string().optional(),
        //       })
        //       .optional()
        //   )
        //   .optional(),
    }),
});
const loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email is required to login" })
            .email({ message: "Provide a valid email" }),
        password: zod_1.z.string({ required_error: "Password is required to login" }),
    }),
});
const refreshTokenValidation = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required!",
        }),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: "Old password is required",
        }),
        newPassword: zod_1.z
            .string({ required_error: "Password is required" })
            .min(6, "new password minimum 6 character"),
    }),
});
exports.authValidation = {
    registerUserValidationSchema,
    updateUserValidationSchema,
    loginValidation,
    refreshTokenValidation,
    changePasswordValidationSchema,
};
