const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Blog = require('../models/blogModel');

exports.blog_list = asyncHandler(async (req, res, next) => {
  //   const allBlog = await Blog.find();
  return res.send('blog list not implemented');
});

exports.blog_detail = asyncHandler((req, res, next) => {
  return res.send('blog detail not implemented');
});
