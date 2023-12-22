const express = require('express');
const router = express.Router();
const logInController = require('../controllers/logInController');

router.post('/', logInController.log_in_post);

module.exports = router;
