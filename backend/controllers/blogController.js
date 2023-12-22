const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Blog = require('../models/blogModel');
const User = require('../models/userModel');

const jwt = require('jsonwebtoken');

exports.blog_list = asyncHandler(async (req, res, next) => {
  const blogList = await Blog.find({}, '-description').sort({ title: 1 });
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
        return res.status(200).json({ auth: true, data: blogList, user });
      }
    });
  } else {
    // no token, just send the blog data
    return res.status(200).json({ auth: false, data: blogList });
  }
});

exports.blog_detail = asyncHandler(async (req, res, next) => {
  //search for the blog
  const selectedBlog = await Blog.findById(req.params.id).exec();
  //if not exist we res send not exist
  if (req.token) {
    // maybe can create MW to attach user to reqOBJ, but how to handle if JWT expires and theres still req.user?
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, userData) => {
      if (err) {
        return res.status(404).json({ message: err });
      } else {
        const user = await User.findOne(
          { username: userData.username },
          'firstName lastName username id'
        ).exec();
        if (!selectedBlog) {
          return res
            .status(404)
            .json({ auth: true, message: 'No Blog Found', data: [], user });
        } else {
          return res.status(200).json({ auth: true, data: selectedBlog, user });
        }
      }
    });
  } else {
    return res.status(200).json({ auth: false, data: selectedBlog });
  }
});
