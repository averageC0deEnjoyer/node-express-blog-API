const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 200,
    },
    createdById: { type: Schema.Types.Object, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', commentSchema);
