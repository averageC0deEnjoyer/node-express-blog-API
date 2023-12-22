const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', verifyToken, blogController.blog_list);

router.get('/:id', verifyToken, blogController.blog_detail);

//todo router.post to create comment, edit comment, delete comment by specific user

function verifyToken(req, res, next) {
  //process the headers and put token at req Obj
  if (req.headers.authorization !== undefined) {
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    req.token = token;
    next();
  } else {
    next();
  }
}

module.exports = router;
