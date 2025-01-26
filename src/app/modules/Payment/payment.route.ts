import { Router } from "express";
import { paymenController } from "./payment.controller";

const router = Router();

router.post("/confirm-payment", paymenController.createPaymentHistory);
router.get("/get-payment-history", paymenController.getPaymenthistory);
export const paymentRoute = router;
