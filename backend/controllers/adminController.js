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

exports.create_blog = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.adminStatus === true) {
    if (!req.body.title || !req.body.description) {
      return res
        .status(400)
        .json({ message: 'Please input all the required fields' });
    }

    // have to validate the input here actually but stil thinking whats the best way
    //if every input already sanitized and escaped then create new blog
    const newBlog = await Blog.create({
      title: req.body.title,
      description: req.body.description,
      commentsId: [],
      createdById: req.user._id,
    });
    return res.status(201).json({
      auth: true,
      message: 'Blog succesfully created',
      data: { blog: newBlog },
    });
  } else {
    return res.status(401).json({ message: 'Not Authorized' });
  }
});

exports.update_blog_published_state_from_home = asyncHandler(
  async (req, res, next) => {
    if (req.user && req.user.adminStatus === true) {
      const { blogId } = req.body;
      const selectedBlog = await Blog.findById(blogId).exec();
      const updatedBlog = await Blog.findOneAndUpdate(
        { _id: blogId },
        { published: !selectedBlog.published },
        { new: true }
      ).exec();
      return res.status(200).json({
        auth: true,
        message: 'Success update publish state',
        data: { blog: updatedBlog },
      });
    } else {
      return res.status(401).json({ message: 'Not Authorized' });
    }
  }
);
