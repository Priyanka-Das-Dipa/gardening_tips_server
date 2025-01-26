import status from "http-status";
import catchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await authServices.registerUserDb(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User Register successfully",
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginToDb(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Login successfully!!!",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshTokenDb(refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Access token retrieved successfully!",
    data: result,
  });
});
// update user
const updateUser = catchAsync(async (req, res) => {
  const result = await authServices.updateUserDb(req.params.id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Updated successfully!!!",
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await authServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password updated successfully!!!",
    data: result,
  });
});
export const authController = {
  registerUser,
  loginUser,
  refreshToken,
  updateUser,
  changePassword,
};
