const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.blog_list);

router.get('/:id', blogController.blog_detail);

module.exports = router;
