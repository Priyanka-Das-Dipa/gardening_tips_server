import status from "http-status";
import catchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";
import { postService } from "./post.service";

const makePost = catchAsync(async (req, res) => {
  const result = await postService.makePostDb(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post Created successfully",
    data: result,
  });
});

const getPosts = catchAsync(async (req, res) => {
  const result = await postService.getAllPost(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Posts retrive successfully",
    data: result,
  });
});

const postVoteSummery = catchAsync(async (req, res) => {
  const result = await postService.getVoteSummeryDb(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Upvote and dowVotes retrieve",
    data: result,
  });
});

// get post by id
const getPostByid = catchAsync(async (req, res) => {
  const result = await postService.getPostByidDb(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post retrieve successfully",
    data: result,
  });
});
// get post by userId
const getPostByUserId = catchAsync(async (req, res) => {
  const result = await postService.getPostByUserIdDb(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post retrieve successfully",
    data: result,
  });
});
const handleVoting = catchAsync(async (req, res) => {
  const result = await postService.handleVote(req.params.postId, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: result?.message,
    data: null,
  });
});
const addComments = catchAsync(async (req, res) => {
  const result = await postService.addComment(req.params.postId, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: result?.message,
    data: null,
  });
});
const updatePost = catchAsync(async (req, res) => {
  const result = await postService.updatePostDb(req.params.postId, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post updated successfully",
    data: result,
  });
});
const deletePostId = catchAsync(async (req, res) => {
  const result = await postService.deletePost(req.params.postId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post deleted successfully",
    data: result,
  });
});
const postCount = catchAsync(async (req, res) => {
  const result = await postService.getTotalPostCount();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Total post count got",
    data: result,
  });
});
export const postController = {
  makePost,
  getPosts,
  postVoteSummery,
  getPostByid,
  getPostByUserId,
  handleVoting,
  addComments,
  updatePost,
  deletePostId,
  postCount,
};
