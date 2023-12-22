const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/signUpController');

router.post('/', signUpController.sign_up_post);

module.exports = router;
