const Blog = require("../models/Blog");
const User = require("../models/User");

exports.deleteBlog = async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    return res.status(404).json({
      status: "fail",
      message: `Blog with id ${id} has not been found`,
    });
  }

  res.status(204).end();
};

exports.createBlog = async (req, res) => {
  const { title, author, likes, url } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      status: "bad request",
      message: "Title or author are required",
    });
  }
  const user = await User.findById(req.userId);

  const newBlog = new Blog({
    title,
    author,
    likes,
    url,
    user: user.id,
  });

  await newBlog.save();

  user.blogs = user.blogs.concat(newBlog._id);

  await user.save();

  res.status(201).json({ status: "success", data: newBlog });
};

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("user", { username: 1, name: 1 });
  return res.json({ message: "success", data: blogs });
};

exports.getBlog = async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id).populate("user", {
    name: 1,
    username: 1,
  });

  if (!blog) {
    return res.status(404).json({
      status: "fail",
      message: `Blog with id ${id} has not been found`,
    });
  }

  res.json({ status: "succes", data: blog });
};

exports.updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, author, url, likes } = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, author, url, likes },
    {
      runValidators: true,
      new: true,
    }
  );

  if (!updatedBlog) {
    return res.status(404).json({
      status: "fail",
      message: `Blog with id ${id} has not been found`,
    });
  }

  res.status(201).json({ status: "succes", data: updatedBlog });
};
