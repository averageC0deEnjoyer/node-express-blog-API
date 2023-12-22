const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const verifyToken = require('../utils/verifyToken');

router.get('/', verifyToken, blogController.blog_list);

router.get('/:id', verifyToken, blogController.blog_detail);

// router.post('/:id', verifyToken, blogController.blog_detail_add_comment);

//todo router.post to create comment, edit comment, delete comment by specific user

module.exports = router;
