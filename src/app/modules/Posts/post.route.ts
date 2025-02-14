import { Router } from "express";
import authGaurd from "../../middlewares/authGaurd";
import { USER_ROLE } from "../User/user.constant";
import { postController } from "./post.controller";
import validateRequest from "../../middlewares/validateRequest";
import { postUpdateValidationSchema } from "./post.validation";

const router = Router();
router.post(
  "/",
  // authGaurd(USER_ROLE.USER, USER_ROLE.ADMIN),
  postController.makePost
);
router.get("/", postController.getPosts);
router.get("/total-post", postController.postCount);
router.get("/:id", postController.getPostByid);
router.get("/postby-user/:id", postController.getPostByUserId);
router.get("/voteSummery/:id", postController.postVoteSummery);
router.put(
  "/handle-voting/:postId",
  // authGaurd(USER_ROLE.ADMIN, USER_ROLE.USER),
  postController.handleVoting
);
router.put(
  "/handle-comment/:postId",
  // authGaurd(USER_ROLE.ADMIN, USER_ROLE.USER),
  postController.addComments
);
router.put(
  "/update-post/:postId",
  // authGaurd(USER_ROLE.USER, USER_ROLE.ADMIN),
  validateRequest(postUpdateValidationSchema),
  postController.updatePost
);
router.delete(
  "/delete/:postId",
  // authGaurd(USER_ROLE.USER, USER_ROLE.ADMIN),
  postController.deletePostId
);
export const postRouter = router;
