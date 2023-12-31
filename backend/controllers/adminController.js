const asyncHandler = require('express-async-handler');

const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');
//show all blog list
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
//create blog from home page

exports.create_blog = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.adminStatus === true) {
    if (!req.body.title || !req.body.description || !req.body.imageText) {
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
      imageText: req.body.imageText,
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
//edit publish state from home page
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

exports.delete_blog = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.adminStatus === true) {
    const blog = await Blog.findById(req.params.blogId).exec();
    //delete comments first
    blog.commentsId.forEach(async (commentId) => {
      await Comment.findByIdAndDelete(commentId).exec();
    });
    //then we delete the blog
    await Blog.findByIdAndDelete(req.params.blogId).exec();
    return res.status(200).json({ message: 'Blog and all Comment Deleted' });
  } else {
    return res.status(401).json({ message: 'Not Authorized' });
  }
});

exports.get_blog_detail = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.adminStatus === true) {
    const blog = await Blog.findById(req.params.blogId)
      .populate({
        path: 'commentsId',
        populate: {
          path: 'createdById',
          select: 'firstName lastName username',
        },
        select: '-__v',
      })
      .exec();
    if (!blog) {
      return res.status(200).json({ message: 'No Blog Found' });
    }
    return res
      .status(200)
      .json({ message: 'Success Get Blog Data', data: { blog } });
  } else {
    return res.status(401).json({ message: 'Not Authorized' });
  }
});

exports.update_blog_detail = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.adminStatus === true) {
    if (!req.body.title || !req.body.description) {
      return res
        .status(400)
        .json({ message: 'Please Input all the Required Fields' });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      req.body,
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: 'Update Blog Successful', data: { blog: updatedBlog } });
  } else {
    return res.status(401).json({ message: 'Not Authorized' });
  }
});

exports.delete_comment_from_blog = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.adminStatus === true) {
    const [blog, comment] = await Promise.all([
      Blog.findById(req.params.blogId).exec(),
      Comment.findByIdAndDelete(req.body.commentId).exec(),
    ]);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    const filteredCommentsIdArr = blog.commentsId.filter(
      (commentId) => !commentId.equals(req.body.commentId)
    );
    await Blog.findOneAndUpdate(
      { _id: req.params.blogId },
      { commentsId: filteredCommentsIdArr },
      { new: true }
    );
    await Comment.findByIdAndDelete(req.body.commentId);
    return res.status(200).json({ message: 'Deleted Comment' });
  } else {
    return res.status(401).json({ message: 'Not Authorized' });
  }
});
