import status from "http-status";
import catchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";
import { categoryService } from "./category.service";

const createCatergory = catchAsync(async (req, res) => {
    const result = await categoryService.createCategoryDb(req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Category Created successfully",
      data: result,
    });
  });
  const getAllCategory = catchAsync(async (req, res) => {
    const result = await categoryService.getCategoryDb();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Categories retried",
      data: result,
    });
  });
  export const categoryController = {
    createCatergory,
    getAllCategory,
  };