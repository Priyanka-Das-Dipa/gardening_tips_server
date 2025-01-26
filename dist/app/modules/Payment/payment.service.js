"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_modal_1 = require("../User/user.modal");
const payment_modal_1 = require("./payment.modal");
const paymentHistoryDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = user_modal_1.User.isUserExistsByEmail(payload.email);
    if (!userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const paymentHistory = yield payment_modal_1.Payments.create(payload);
    yield user_modal_1.User.findOneAndUpdate({ email: payload.email }, { verified: true }, { new: true, runValidators: true, upsert: true });
    return paymentHistory;
});
const getAllPaymentHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield payment_modal_1.Payments.find({ isDeleted: false }).populate("userId");
});
exports.paymentService = {
    paymentHistoryDb,
    getAllPaymentHistory,
};
