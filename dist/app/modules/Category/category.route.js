"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const authGaurd_1 = __importDefault(require("../../middlewares/authGaurd"));
const user_constant_1 = require("../User/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
router.post("/", (0, authGaurd_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(category_validation_1.categoryValidation.categoryValidationSchema), category_controller_1.categoryController.createCatergory);
router.get("/", category_controller_1.categoryController.getAllCategory);
exports.categoryRouter = router;
