import { z } from "zod";

export const paymentzodValidation = z.object({
  transactionid: z.string().nonempty("Transaction ID is required"),
  paymentTime: z
    .number()
    .int()
    .positive("Payment time must be a positive integer"),
  user: z.string().length(24, "User ID must be a valid ObjectId"),
  email: z.string().email("Invalid email format").optional(), // Optional field
  name: z.string().nonempty("Name is required").optional(), // Optional field
  isDeleted: z.boolean().default(false), // Default value for isDeleted
});
export const paymnetUpdatevalidation = z.object({
  transactionid: z.string().optional(),
  paymentTime: z
    .number()
    .int()
    .positive("Payment time must be a positive integer")
    .optional(),
  user: z.string().length(24, "User ID must be a valid ObjectId").optional(),
  email: z.string().email("Invalid email format").optional(),
  name: z.string().nonempty("Name cannot be empty").optional(),
  isDeleted: z.boolean().optional(),
});
