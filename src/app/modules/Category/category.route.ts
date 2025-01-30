import { Router } from "express";
import authGaurd from "../../middlewares/authGaurd";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidation } from "./category.validation";
import { categoryController } from "./category.controller";

const router = Router();

router.post(
  "/",
  // authGaurd(USER_ROLE.ADMIN),
  validateRequest(categoryValidation.categoryValidationSchema),
  categoryController.createCatergory
);
router.get("/", categoryController.getAllCategory);

export const categoryRouter = router;
