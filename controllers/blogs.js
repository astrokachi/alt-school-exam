const { Unauthorized } = require('../errors/unauthorized');
const Blog = require('../models/Blog');

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ state: 'published' });
    res.send(blogs);
  } catch (error) {
    next(error);
  }
};

const getMyBlogs = async (req, res, next) => {
  try {
    console.log(req.user);
    const myBlogs = await Blog.find({ author: req.user.userId });
    res.json(myBlogs);
  } catch (error) {
    next(error);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      state: 'published',
    }).populate('author');
    const oldReadCount = blog.read_count;
    await blog.update({ read_count: oldReadCount + 1 });
    res.send(blog);
  } catch (error) {
    next(error);
  }
};

const postBlog = async (req, res, next) => {
  try {
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
    const blog = await Blog.findById(req.params.id);
    if (req.user.userId === blog.author) {
      const update = await blog.updateOne({ ...req.body });
      res.send(update);
    } else
      throw new Unauthorized( 
        'You are do not have authorization to update this post '
      );
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
  getMyBlogs,
};
