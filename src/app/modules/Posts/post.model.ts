/* eslint-disable no-unused-vars */
import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>(
  {
    title: { type: String, require: true },
    post: {
      type: String,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    activity: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        comment: [{ type: String }],
        votes: { type: Boolean, default: false },
        _id: false,
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      required: [true, "Post category is required"],
      ref: "Category",
    },
    premium: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

postSchema.virtual("upVotes").get(function (this: TPost) {
  return this.activity?.filter((act) => act.votes === true);
});
postSchema.virtual("downVotes").get(function (this: TPost) {
  return this.activity?.filter((act) => act.votes === false);
});

postSchema.set("toJSON", { virtuals: true });

export const Post = model<TPost>("Post", postSchema);
