"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payments = void 0;
const mongoose_1 = require("mongoose");
const payemntModelSchema = new mongoose_1.Schema({
    transactionId: { type: String, required: true },
    paymentTime: { type: Number, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    email: { type: String },
    name: { type: String },
    isDeleted: { type: Boolean, default: false },
});
exports.Payments = (0, mongoose_1.model)("Payments", payemntModelSchema);
