const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, minLength: 1 },
    secondName: { type: String, required: true, minLength: 1 },
    username: { type: String, required: true, minLength: 1 },
    password: { type: String, required: true, minLength: 1 },
    adminStatus: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoosem.model('User', userSchema);
