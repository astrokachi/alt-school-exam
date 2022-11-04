const { Router } = require('express');
const express = require('express');
const blogRouter = express.Router();
const passport = require('passport');
const {
  getAllBlogs,
  postBlog,
  updateBlogPost,
  deleteBlogPost,
  getBlog,
  getMyBlogs,
} = require('../controllers/blogs');

blogRouter
  .route('/')
  .get(getAllBlogs)
  .post(passport.authenticate('jwt', { session: false }), postBlog);

blogRouter
  .route('/my_blogs')
  .get(passport.authenticate('jwt', { session: false }), getMyBlogs);

blogRouter
  .route('/:id')
  .get(getBlog)
  .patch(passport.authenticate('jwt', { session: false }), updateBlogPost)
  .delete(passport.authenticate('jwt', { session: false }), deleteBlogPost);

module.exports = blogRouter;
