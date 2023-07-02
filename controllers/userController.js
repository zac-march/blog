const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Handle user create on POST.
exports.user_create_post = asyncHandler(async (req, res, next) => {
  res.json({ message: "NOT IMPLEMENTED: user create POST" });
});
