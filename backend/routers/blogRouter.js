const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.blog_list);

router.get('/:id', blogController.blog_detail);

//todo router.post to create comment, edit comment, delete comment by specific user

function verifyToken(req, res, next) {
  if (req.header.authorization !== undefined) {
    const token = req.header.authorization.split(' ')[1];
    req.token = token;
    next();
  } else {
    next();
  }
}

module.exports = router;
