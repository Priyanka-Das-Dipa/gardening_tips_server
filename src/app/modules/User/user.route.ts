import { Router } from "express";
import { userController } from "./user.controller";
import authGaurd from "../../middlewares/authGaurd";
import { USER_ROLE } from "./user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = Router();
router.get("/", userController.getAlluser);
router.post("/confirm-payment", userController.confirmPayment);
router.get(
  "/:email",
  authGaurd(USER_ROLE.USER, USER_ROLE.ADMIN),
  userController.getUserByEmail
);
router.get("/id/:id", userController.getUserById);
router.put(
  "/follow-unfollow",
  authGaurd(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(userValidation.followUnfollowValidationSchema),
  userController.followUnfollow
);
router.delete(
  "/delete/:userId",
  // authGaurd(USER_ROLE.ADMIN),
  userController.deleteUser
);
router.patch(
  "/user-admin/:userId",
  // authGaurd(USER_ROLE.ADMIN),
  userController.makeAdminUser
);
export const userRoute = router;
