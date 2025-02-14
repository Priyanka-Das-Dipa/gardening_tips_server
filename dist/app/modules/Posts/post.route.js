"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const post_validation_1 = require("./post.validation");
const router = (0, express_1.Router)();
router.post("/", 
// authGaurd(USER_ROLE.USER, USER_ROLE.ADMIN),
post_controller_1.postController.makePost);
router.get("/", post_controller_1.postController.getPosts);
router.get("/total-post", post_controller_1.postController.postCount);
router.get("/:id", post_controller_1.postController.getPostByid);
router.get("/postby-user/:id", post_controller_1.postController.getPostByUserId);
router.get("/voteSummery/:id", post_controller_1.postController.postVoteSummery);
router.put("/handle-voting/:postId", 
// authGaurd(USER_ROLE.ADMIN, USER_ROLE.USER),
post_controller_1.postController.handleVoting);
router.put("/handle-comment/:postId", 
// authGaurd(USER_ROLE.ADMIN, USER_ROLE.USER),
post_controller_1.postController.addComments);
router.put("/update-post/:postId", 
// authGaurd(USER_ROLE.USER, USER_ROLE.ADMIN),
(0, validateRequest_1.default)(post_validation_1.postUpdateValidationSchema), post_controller_1.postController.updatePost);
router.delete("/delete/:postId", 
// authGaurd(USER_ROLE.USER, USER_ROLE.ADMIN),
post_controller_1.postController.deletePostId);
exports.postRouter = router;
