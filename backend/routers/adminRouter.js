const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../utils/verifyToken');
const getUserFromToken = require('../utils/getUserFromToken');

//get blog list from home page
router.get('/', [verifyToken, getUserFromToken], adminController.blog_list);

// create a blog from home page
router.post('/', [verifyToken, getUserFromToken], adminController.create_blog);

router.patch(
  '/',
  [verifyToken, getUserFromToken],
  adminController.update_blog_published_state_from_home
);
//delete a blog from home page
// router.delete('/');

// router.put();

module.exports = router;
