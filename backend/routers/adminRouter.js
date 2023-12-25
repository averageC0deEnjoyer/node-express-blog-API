const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../utils/verifyToken');
const getUserFromToken = require('../utils/getUserFromToken');

//get blog list from home page
router.get('/', [verifyToken, getUserFromToken], adminController.blog_list);

//delete a blog from home page
// router.delete('/');

// //create a blog from home page
// router.post('/');

// router.put();

module.exports = router;
