const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogPost = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for your blog'],
      unique: [true, 'This title already exists!'],
    },
    state: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    description: String,
    tags: String,
    author: {
      type: String,
      ref: 'User',
    },
    read_count: Number,
    reading_time: String,
    body: {
      type: String,
      required: [true, 'Please enter text in the body of your blog'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogPost);
