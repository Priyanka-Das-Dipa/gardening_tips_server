"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
router.post("/", 
// authGaurd(USER_ROLE.ADMIN),
(0, validateRequest_1.default)(category_validation_1.categoryValidation.categoryValidationSchema), category_controller_1.categoryController.createCatergory);
router.get("/", category_controller_1.categoryController.getAllCategory);
exports.categoryRouter = router;
