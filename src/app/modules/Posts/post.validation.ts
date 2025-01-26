import { z } from "zod";

export const postValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  post: z.any(),
  userId: z.string({ required_error: "User id required" }),
  activity: z
    .array(
      z.object({
        userId: z
          .string()
          .min(1, "User ID is required for activity")
          .optional(),
        votes: z.boolean().optional(),
        comment: z.array(z.string().min(1, "Comment is required")).optional(),
      })
    )
    .optional(),
  category: z.string({ required_error: "Post category is required" }),
  premium: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export const postUpdateValidationSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  post: z.any().optional(),
  userId: z.string({ required_error: "User id required" }).optional(),

  category: z
    .string({ required_error: "Post category is required" })
    .optional(),
  premium: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});
export type TPost = z.infer<typeof postUpdateValidationSchema>;
