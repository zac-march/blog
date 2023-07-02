const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

// Display list of all posts.
exports.post_list = asyncHandler(async (req, res, next) => {
  res.json({ message: "NOT IMPLEMENTED: post list" });
});

// Display detail page for a specific post.
exports.post_detail = asyncHandler(async (req, res, next) => {
  res.json({ message: `NOT IMPLEMENTED: post detail: ${req.params.id}` });
});

// Handle post create on POST.
exports.post_create_post = asyncHandler(async (req, res, next) => {
  res.json({ message: "NOT IMPLEMENTED: post create POST" });
});

// Handle post delete on POST.
exports.post_delete_post = asyncHandler(async (req, res, next) => {
  res.json({ message: "NOT IMPLEMENTED: post delete POST" });
});

// Handle post update on POST.
exports.post_update_post = asyncHandler(async (req, res, next) => {
  res.json({ message: "NOT IMPLEMENTED: post update POST" });
});
