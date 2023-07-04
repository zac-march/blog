const express = require("express");
const router = express.Router();

// Require controller modules.
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");

/// POST ROUTES ///

// GET request for creating a post. NOTE This must come before routes that display post (uses id).
router.post("/post/create", postController.post_create_post);

// POST request to delete post.
router.post("/post/:id/delete", postController.post_delete_post);

// POST request to update post.
router.post("/post/:id/update", postController.post_update_post);

// GET request for one post.
router.get("/post/:id", postController.post_detail);

// GET request for list of all post items.
router.get("/posts", postController.post_list);

/// COMMENT ROUTES ///

// GET request for creating comment.
router.post(
  "/post/:postId/comment/create",
  commentController.comment_create_post
);

// POST request to delete comment.
router.post(
  "/post/:postId/comment/:id/delete",
  commentController.comment_delete_post
);

// POST request to update comment.
router.post(
  "/post/:postId/comment/:id/update",
  commentController.comment_update_post
);

// GET request for list of all comments.
router.get("/post/:postId/comments", commentController.comment_list);

/// USER ROUTES ///

//POST request for creating user.
router.post("/user/create", userController.user_create_post);

module.exports = router;
