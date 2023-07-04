const Post = require("../models/post");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Display list of all posts.
exports.post_list = asyncHandler(async (req, res, next) => {
  let posts = await Post.find({}).limit(5).sort("-dateAdded");
  return res.json(posts);
});

// Display detail page for a specific post.
exports.post_detail = asyncHandler(async (req, res, next) => {
  try {
    let post = await Post.findOne({ _id: req.params.id }).populate(
      "user",
      "username"
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json({
      body: post.body,
      title: post.title,
      dateAdded: post.dateAdded,
      author: post.user.username,
    });
  } catch (error) {
    next(error);
  }
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
