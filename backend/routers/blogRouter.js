const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const verifyToken = require('../utils/verifyToken');
const getUserFromToken = require('../utils/getUserFromToken');

router.get('/', [verifyToken, getUserFromToken], blogController.blog_list);

router.get('/:id', [verifyToken, getUserFromToken], blogController.blog_detail);

router.post(
  '/:id',
  [verifyToken, getUserFromToken],
  blogController.blog_detail_create_comment
);

//todo router.post to create comment, edit comment, delete comment by specific user

module.exports = router;
