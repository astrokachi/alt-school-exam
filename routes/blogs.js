const { Router } = require("express");
const express = require("express");
const blogRouter = express.Router();
const passport = require("passport");
const {
	getAllBlogs,
	postBlog,
	updateBlogPost,
	deleteBlogPost,
	getBlog,
	getMyBlogs,
} = require("../controllers/blogs");
const blogValidator = require("../validators/blog.validator");

blogRouter.route("/").get(getAllBlogs);

blogRouter
	.route("/create")
	.post(
		passport.authenticate("jwt", { session: false }),
		blogValidator,
		postBlog
	);

blogRouter
	.route("/my_blogs")
	.get(passport.authenticate("jwt", { session: false }), getMyBlogs);

blogRouter
	.route("my_blogs/:id")
	.get(getBlog)
	.patch(
		passport.authenticate("jwt", { session: false }),
		blogValidator,
		updateBlogPost
	)
	.delete(passport.authenticate("jwt", { session: false }), deleteBlogPost);

module.exports = blogRouter;
