"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
router.post("/confirm-payment", payment_controller_1.paymenController.createPaymentHistory);
router.get("/get-payment-history", payment_controller_1.paymenController.getPaymenthistory);
exports.paymentRoute = router;
