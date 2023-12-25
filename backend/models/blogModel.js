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
    commentsId: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdById: { type: Schema.Types.ObjectId, ref: 'User' },
    published: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', blogSchema);
