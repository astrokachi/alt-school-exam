const Blog = require('../models/Blog');

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ state: 'published' }).populate('author');
    res.send(blogs);
  } catch (error) {
    next(error);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      id: req.params.id,
      state: 'published',
    });
    const oldReadCount = blog.read_count;
    await blog.update({ read_count: oldReadCount + 1 });

    res.send(blog);
  } catch (error) {
    next(error);
  }
};

const postBlog = async (req, res, next) => {
  try {
    // res.send(req.user);
    const post = await Blog.create({
      ...req.body,
      read_count: 0,
      reading_time: `${req.body.body.length / 250} minutes`,
      author: req.user.userId,
    });
    res.json({ post });
  } catch (error) {
    next(error);
  }
};

const updateBlogPost = async (req, res, next) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.send(updated);
  } catch (error) {
    next(error);
  }
};

const deleteBlogPost = async (req, res, next) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    res.send(deleted);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBlogs,
  postBlog,
  updateBlogPost,
  deleteBlogPost,
  getBlog,
};
