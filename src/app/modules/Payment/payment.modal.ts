import { model, Schema } from "mongoose";
import { TPayment } from "./payment.interface";

const payemntModelSchema = new Schema<TPayment>({
    transactionId: { type: String, required: true },
    paymentTime: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    email: { type: String },
    name: { type: String },
    isDeleted: { type: Boolean, default: false },
  });
  
  export const Payments = model("Payments", payemntModelSchema);