const { Unauthorized } = require('../errors/unauthorized');
const Blog = require('../models/Blog');

const getAllBlogs = async (req, res, next) => {
  try {
    const query = req.query;
    console.log(query);
    const queryObject = {};
    if (query.author) {
      queryObject.author = query.author;
    }
    if (query.title) {
      queryObject.title = query.title;
    }

    if (query.tags) {
      queryObject.tags = query.tags;
    }

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 20;
    const skip = (page - 1) * limit;
    const blogs = await Blog.find({ ...queryObject, state: 'published' })
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: query.created_at,
        read_count: query.read_count,
        reading_time: query.reading_time,
      });

    res.send(blogs);
  } catch (error) {
    next(error);
  }
};

const getMyBlogs = async (req, res, next) => {
  try {

    const query = req.query;
    const queryObject = {};

    if (query.state) {
      queryObject.state = query.state;
    }

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;
    const skip = (page - 1) * limit;

    const myBlogs = await Blog.find({
      ...queryObject,
      author: req.user.userId,
    })
      .skip(skip)
      .limit(limit);

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

    if (!blog) {
      return res.json({ msg: 'No blog found' });
    }
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
      reading_time: req.body.body.length / 250,
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
    const blog = await Blog.findById(req.params.id);
    if (req.user.userId === blog.author) {
      const update = await blog.deleteOne({ _id: req.params.id });
      res.send(update);
    } else
      throw new Unauthorized(
        'You are do not have authorization to delete this post '
      );
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
