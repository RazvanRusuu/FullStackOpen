const Blog = require("../models/Blog");
const initialsBlogs = [
  {
    title: "bbaaabaa",
    author: "2121",
    url: "dsadsaa",
    likes: 13,
  },
  {
    title: "bbaaabaa",
    author: "212122",
    url: "dsadsaa",
    likes: 2,
  },
];

const blogsDB = async () => {
  const blogs = await Blog.find();
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialsBlogs, blogsDB };
