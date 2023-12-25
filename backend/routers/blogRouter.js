const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const verifyToken = require('../utils/verifyToken');
const getUserFromToken = require('../utils/getUserFromToken');

//only fetch 'PUBLISHED' blog
router.get('/', [verifyToken, getUserFromToken], blogController.blog_list);

router.get('/:id', [verifyToken, getUserFromToken], blogController.blog_detail);

router.post(
  '/:id',
  [verifyToken, getUserFromToken],
  blogController.blog_detail_create_comment
);

//update a comment from a blog , user can only update their own comment
router.put(
  '/:id',
  [verifyToken, getUserFromToken],
  blogController.blog_detail_update_comment
);

//delete a comment from a blog , user can only delete their own comment
// router.delete();
router.delete(
  '/:id',
  [verifyToken, getUserFromToken],
  blogController.blog_detail_delete_comment
);

//todo router.post to create comment, edit comment, delete comment by specific user

module.exports = router;
