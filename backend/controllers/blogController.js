const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Blog = require('../models/blogModel');
const User = require('../models/userModel');

const jwt = require('jsonwebtoken');

exports.blog_list = asyncHandler(async (req, res, next) => {
  const blogList = await Blog.find().sort({ title: 1 });
  //if user has JWT Token
  if (req.token) {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, userData) => {
      if (err) {
        return res.status(404).json({ message: err });
      } else {
        const user = await User.findOne(
          { username: userData.username },
          'firstName lastName username'
        ).exec();
        res.status(200).json({ auth: true, data: blogList, user });
      }
    });
  } else {
    // no token, just send the blog data
    return res.status(200).json({ auth: false, data: blogList });
  }
});

exports.blog_detail = asyncHandler((req, res, next) => {
  return res.json({ message: 'blog detail not implemented' });
});
