/* eslint-disable no-unused-vars */
import mongoose, { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

type FriendStatus = "confirmed" | "pendding";
export type TUser = {
  _id?: string;
  name: string;
  role?: keyof typeof USER_ROLE;
  email: string;
  follower?: mongoose.Schema.Types.ObjectId[];
  following?: mongoose.Schema.Types.ObjectId[];
  upVotesItem?: mongoose.Schema.Types.ObjectId[];
  downVotesItem?: mongoose.Schema.Types.ObjectId[];
  verified?: boolean;
  password: string;
  passwordChangedAt?: Date;
  phoneNumber?: string;
  profilePhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
  friends?: {
    sent?: {
      id: Types.ObjectId; // MongoDB ObjectId type
      status: FriendStatus;
    }[];
    received?: {
      id: Types.ObjectId; // MongoDB ObjectId type
      status: FriendStatus;
    }[];
  };

  links?: {
    socialName?: string;
    url?: string;
  }[];
  address?: string;
  isDeleted?: boolean;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
