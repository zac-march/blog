const Comment = require("../models/comment");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Display list of all Genre.
exports.comment_list = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "username")
    .exec();

  const commentPromises = comments.map(async (comment) => {
    const { body, dateAdded, user } = comment;
    const author = user.username;
    return {
      body,
      dateAdded,
      author,
    };
  });

  const commentResults = await Promise.all(commentPromises);

  return res.json(commentResults);
});

// Handle Genre create on POST.
exports.comment_create_post = asyncHandler(async (req, res, next) => {
  res.json({ message: "NOT IMPLEMENTED: Genre create POST" });
});

// Handle Genre delete on POST.
exports.comment_delete_post = asyncHandler(async (req, res, next) => {
  res.json({ message: "NOT IMPLEMENTED: Genre delete POST" });
});

// Handle Genre update on POST.
exports.comment_update_post = asyncHandler(async (req, res, next) => {
  res.json({ message: "NOT IMPLEMENTED: Genre update POST" });
});
