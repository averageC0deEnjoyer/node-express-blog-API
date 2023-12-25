const asyncHandler = require('express-async-handler');

const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');

exports.blog_list = asyncHandler(async (req, res, next) => {
  const blogList = await Blog.find({}, '-description')
    .sort({ title: 1 })
    .exec();

  if (req.user && req.user.adminStatus === true) {
    return res.status(200).json({ auth: true, user: req.user, data: blogList });
  } else {
    return res.status(401).json({ message: 'Not Authorized' });
  }
});
