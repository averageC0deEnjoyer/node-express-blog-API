const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../utils/verifyToken');
const getUserFromToken = require('../utils/getUserFromToken');

//get blog list from home page
router.get('/', [verifyToken, getUserFromToken], adminController.blog_list);

// create a blog from home page
router.post('/', [verifyToken, getUserFromToken], adminController.create_blog);

//update published state
router.patch(
  '/',
  [verifyToken, getUserFromToken],
  adminController.update_blog_published_state_from_home
);
//delete a blog from home page
router.delete(
  '/:blogId',
  [verifyToken, getUserFromToken],
  adminController.delete_blog
);

router.get(
  '/:blogId',
  [verifyToken, getUserFromToken],
  adminController.get_blog_detail
);

router.post(
  '/:blogId',
  [verifyToken, getUserFromToken],
  adminController.update_blog_detail
);

router.delete(
  '/:blogId/comments',
  [verifyToken, getUserFromToken],
  adminController.delete_comment_from_blog
);

module.exports = router;
