const Blog = require("../models/Blog");

exports.deleteBlog = async (req, res) => {};

exports.createBlog = async (req, res, next) => {
  try {
    const { title, author, likes, url } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        status: "bad request",
        message: "Title or author are required",
      });
    }
    const existingBlog = await Blog.findOne({ author, title });
    if (existingBlog) {
      return res
        .status(400)
        .json({ status: "failed", message: "Blog already exists" });
    }

    const newBlog = await Blog.create({ title, author, likes, url });
    return res.staus(201).json({ status: "succes", data: newBlog });
  } catch (error) {
    next(error);
  }
};

exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({ message: "success", data: blogs });
  } catch (error) {
    next(error);
  }
};
exports.getBlog = async (req, res) => {};
exports.updateBlog = async (req, res) => {};
