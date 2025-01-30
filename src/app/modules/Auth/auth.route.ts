import { Router } from "express";
import validateRequest, {
  validateRequestCookies,
} from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";
import authGaurd from "../../middlewares/authGaurd";
import { USER_ROLE } from "../User/user.constant";

const router = Router();
router.post(
  "/register",
  validateRequest(authValidation.registerUserValidationSchema),
  authController.registerUser
);

router.post(
  "/login",
  validateRequest(authValidation.loginValidation),
  authController.loginUser
);

router.post(
  "/refresh-token",
  validateRequestCookies(authValidation.refreshTokenValidation),
  authController.refreshToken
);

// update user
router.put(
  "/update-user/:id",

  authGaurd(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(authValidation.updateUserValidationSchema),
  authController.updateUser
);

router.post(
  "/change-password",
  authGaurd(USER_ROLE.USER, USER_ROLE.ADMIN),
  validateRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword
);

export const authRouter = router;
