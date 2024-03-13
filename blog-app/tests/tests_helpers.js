const Blog = require("../models/Blog");
const User = require("../models/User");

const initialsBlogs = [
  {
    title: "bbaaabaa",
    author: "2121",
    url: "dsadsaa",
    user: "65f13ec917337574086fd6fd",
    likes: 13,
  },
  {
    title: "bbaaabaa",
    author: "212122",
    url: "dsadsaa",
    user: "65f13ec917337574086fd6fd",
    likes: 2,
  },
];

const blogsDB = async () => {
  const blogs = await Blog.find().populate("user", {
    name: 1,
    username: 1,
  });
  return blogs.map((blog) => blog.toJSON());
};

const usersInDB = async () => {
  const users = await User.find().populate("blogs", {
    name: 1,
    username: 1,
  });
  return users.map((user) => user.toJSON());
};

module.exports = { initialsBlogs, blogsDB, usersInDB };
