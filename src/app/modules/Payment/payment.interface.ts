import mongoose from "mongoose";
import { z } from "zod";
import { paymentzodValidation } from "./payment.validation";


export type TPayment = {
    userId: mongoose.Types.ObjectId;
    name: string;
    transactionId: string;
    paymentTime: number;
    email: string;
    isDeleted?: boolean;
  };
  
  export type TBookingInfer = z.infer<typeof paymentzodValidation>;