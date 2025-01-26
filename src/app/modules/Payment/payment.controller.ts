import status from "http-status";
import catchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";
import { paymentService } from "./payment.service";

const createPaymentHistory = catchAsync(async (req, res) => {
    const result = await paymentService.paymentHistoryDb(req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "payment recived and user verified",
      data: result,
    });
  });
  const getPaymenthistory = catchAsync(async (req, res) => {
    const result = await paymentService.getAllPaymentHistory();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "payment recived and user verified",
      data: result,
    });
  });
  
  export const paymenController = {
    createPaymentHistory,
    getPaymenthistory,
  };