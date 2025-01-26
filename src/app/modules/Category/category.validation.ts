import { z } from "zod";

const categoryValidationSchema = z.object({
    body: z.object({
      category: z.string({ required_error: "Category name required" }),
      image: z.string().optional(),
    }),
  });
  
  export const categoryValidation = {
    categoryValidationSchema,
  };