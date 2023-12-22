const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minLength: 1,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      minLength: 1,
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Username must not be empty'],
      minLength: 1,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password must not be empty'],
      minLength: 1,
      trim: true,
    },
    adminStatus: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
