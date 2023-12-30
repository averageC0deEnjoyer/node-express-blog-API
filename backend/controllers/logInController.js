const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.log_in_post = asyncHandler(async (req, res, next) => {
  //check if username exist
  const user = await User.findOne({ username: req.body.username }).exec();
  if (user) {
    console.log(user);
    //compare password in DB with input password hashed
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).send({ message: 'Bad credentials' });
    } else {
      //create jwt token
      jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        (err, token) => {
          if (err) {
            return res.status(404).send({ message: err });
          }
          return (
            res
              .status(200)
              //how to use this header (save it at frontend?)
              .header('x-auth-token', token)
              .json({
                message: 'Login Success',
                user: {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  username: user.username,
                  adminStatus: user.adminStatus,
                  _id: user._id,
                },
                token,
              })
          );
        }
      );
    }
  } else {
    return res.status(404).send({ message: `User not registered` });
  }
});
