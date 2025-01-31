import { z } from "zod";
// import { USER_ROLE } from "../User/user.constant";
// import mongoose from "mongoose";

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    // role: z.nativeEnum(USER_ROLE).optional(),
    email: z.string().email("Invalid email address"),
    // follower: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
    // following: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
    // upVotesItem: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
    // downVotesItem: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    // verified: z.boolean().optional(),
    profilePhoto: z.string().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    phoneNumber: z.string().optional(),
    profilePhoto: z.string().optional(),
    address: z.string().optional(),
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

const loginValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required to login" })
      .email({ message: "Provide a valid email" }),
    password: z.string({ required_error: "Password is required to login" }),
  }),
});

const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required!",
    }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Old password is required",
    }),
    newPassword: z
      .string({ required_error: "Password is required" })
      .min(6, "new password minimum 6 character"),
  }),
});

export const authValidation = {
  registerUserValidationSchema,
  updateUserValidationSchema,
  loginValidation,
  refreshTokenValidation,
  changePasswordValidationSchema,
};
