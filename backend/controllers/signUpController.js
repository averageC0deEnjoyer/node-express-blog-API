const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.sign_up_post = asyncHandler(async (req, res, next) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.username ||
    !req.body.password
  ) {
    return res.status(404).json({ message: 'Please input all the fields' });
  }

  const userExist = await User.findOne({ username: req.body.username });
  if (userExist) {
    return res.status(403).json({ message: 'User already exists' });
  } else {
    bcrypt.hash(
      req.body.password,
      Number(process.env.SALT_SECRET), //why i cant use process.env.SALT, but if i use number it works
      async (err, hashedPassword) => {
        if (err) {
          return res.status(404).send({ message: err });
        } else {
          const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPassword,
          });

          jwt.sign(
            {
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              id: newUser._id,
              username: newUser.username,
            },
            process.env.JWT_SECRET,
            (err, token) => {
              if (err) {
                return res.status(404).send({ message: err });
              }
              return res.status(201).json({
                message: 'Successful Registration',
                user: {
                  firstName: newUser.firstName,
                  lastName: newUser.lastName,
                  username: newUser.username,
                  adminStatus: newUser.adminStatus,
                  id: newUser._id,
                },
                token: token,
              });
            }
          );
        }
      }
    );
  }
});

//dont forget expirationdate
