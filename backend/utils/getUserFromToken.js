const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

getUserFromToken = (req, res, next) => {
  if (req.token) {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, userData) => {
      if (err) {
        return res.status(404).json({ message: err });
      } else {
        const user = await User.findOne(
          { username: userData.username },
          'id firstName lastName username adminStatus'
        ).exec();
        req.user = user;
        next();
      }
    });
  } else {
    next();
  }
};

module.exports = getUserFromToken;
