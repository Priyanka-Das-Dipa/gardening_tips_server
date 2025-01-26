"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymnetUpdatevalidation = exports.paymentzodValidation = void 0;
const zod_1 = require("zod");
exports.paymentzodValidation = zod_1.z.object({
    transactionid: zod_1.z.string().nonempty("Transaction ID is required"),
    paymentTime: zod_1.z
        .number()
        .int()
        .positive("Payment time must be a positive integer"),
    user: zod_1.z.string().length(24, "User ID must be a valid ObjectId"),
    email: zod_1.z.string().email("Invalid email format").optional(), // Optional field
    name: zod_1.z.string().nonempty("Name is required").optional(), // Optional field
    isDeleted: zod_1.z.boolean().default(false), // Default value for isDeleted
});
exports.paymnetUpdatevalidation = zod_1.z.object({
    transactionid: zod_1.z.string().optional(),
    paymentTime: zod_1.z
        .number()
        .int()
        .positive("Payment time must be a positive integer")
        .optional(),
    user: zod_1.z.string().length(24, "User ID must be a valid ObjectId").optional(),
    email: zod_1.z.string().email("Invalid email format").optional(),
    name: zod_1.z.string().nonempty("Name cannot be empty").optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
