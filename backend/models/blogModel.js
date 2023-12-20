const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true, minLength: 10, maxLength: 100 },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 300,
    },
    commentsID: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdByID: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', blogSchema);
