"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const authGaurd_1 = __importDefault(require("../../middlewares/authGaurd"));
const user_constant_1 = require("./user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.get("/", user_controller_1.userController.getAlluser);
router.post("/confirm-payment", user_controller_1.userController.confirmPayment);
router.get("/:email", (0, authGaurd_1.default)(user_constant_1.USER_ROLE.USER, user_constant_1.USER_ROLE.ADMIN), user_controller_1.userController.getUserByEmail);
router.get("/id/:id", user_controller_1.userController.getUserById);
router.put("/follow-unfollow", (0, authGaurd_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), (0, validateRequest_1.default)(user_validation_1.userValidation.followUnfollowValidationSchema), user_controller_1.userController.followUnfollow);
router.delete("/delete/:userId", 
// authGaurd(USER_ROLE.ADMIN),
user_controller_1.userController.deleteUser);
router.patch("/user-admin/:userId", 
// authGaurd(USER_ROLE.ADMIN),
user_controller_1.userController.makeAdminUser);
exports.userRoute = router;
