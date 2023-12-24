const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');

exports.blog_list = asyncHandler(async (req, res, next) => {
  const blogList = await Blog.find({}, '-description').sort({ title: 1 });
  if (req.user) {
    return res.status(200).json({ auth: true, data: blogList, user: req.user });
  } else {
    return res.status(200).json({ auth: false, data: blogList });
  }
});

exports.blog_detail = asyncHandler(async (req, res, next) => {
  //search for the blog
  const selectedBlog = await Blog.findById(req.params.id)
    .populate({
      path: 'commentsId',
      populate: { path: 'createdById', select: 'firstName lastName username' },
      select: '-__v',
    })
    .exec();
  //if not exist we res send not exist
  // maybe can create MW to attach user to reqOBJ, but how to handle if JWT expires and theres still req.user? // i thinks its okay because STATELESS
  if (req.user) {
    if (!selectedBlog) {
      return res.status(404).json({
        auth: true,
        message: 'No Blog Found',
        data: [],
        user: req.user,
      });
    } else {
      return res
        .status(200)
        .json({ auth: true, data: selectedBlog, user: req.user });
    }
  } else {
    return res.status(200).json({ auth: false, data: selectedBlog });
  }
});

exports.blog_detail_create_comment = asyncHandler(async (req, res, next) => {
  if (req.user) {
    // later on if we delete a blog, have to waterfall to delete all the comment inside that blog.
    const selectedBlog = await Blog.findById(req.params.id).exec();
    const newComment = await Comment.create({
      commentText: req.body.commentText,
      createdById: req.user._id,
    });
    selectedBlog.commentsId.push(newComment._id);

    const populateSelectedAndUpdatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      selectedBlog
    )
      .populate({
        path: 'commentsId',
        populate: {
          path: 'createdById',
          select: 'firstName lastName username',
        },
        select: '-__v',
      })
      .exec();
    return res.status(201).json({
      auth: true,
      message: 'Success Create Comment',
      data: {
        blogData: {
          blogDetail: populateSelectedAndUpdatedBlog,
          numberOfComments: populateSelectedAndUpdatedBlog.commentsId.length,
        },
      },
    });
  } else {
    return res
      .status(401)
      .json({ auth: false, message: 'You have to log in first' });
  }
});

exports.blog_detail_update_comment = asyncHandler(async (req, res, next) => {
  // we do 3 checks, if user exist, then if commentID valid, then if the user is the one who create the comment
  if (req.user) {
    let comment = await Comment.findById(req.body.commentId).exec();
    console.log(comment);
    if (!comment) {
      return res
        .status(404)
        .json({ auth: true, message: 'No comment like that' });
    } else {
      if (req.user._id.equals(comment.createdById._id)) {
        console.log(comment);
        let updatedComment = new Comment({
          _id: req.body.commentId,
          commentText: req.body.commentText,
          createdById: comment.createdById,
        });
        console.log(updatedComment);
        let savedComment = await Comment.findByIdAndUpdate(
          req.body.commentId,
          updatedComment
        );
        return res.status(200).json({
          auth: true,
          message: 'Success Update Comment',
          savedComment,
        });
      } else {
        return res
          .status(403)
          .json({ auth: true, message: 'It is not your comment' });
      }
    }
  } else {
    return res
      .status(401)
      .json({ auth: false, message: 'You have to log in first' });
  }
});

exports.blog_detail_delete_comment = asyncHandler(async (req, res, next) => {
  if (req.user) {
  } else {
    return res
      .status(401)
      .json({ auth: false, message: 'You have to log in first' });
  }
});
