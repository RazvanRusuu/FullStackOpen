const Blog = require("../models/Blog");
const User = require("../models/User");

const router = require("express").Router();

router.post("/reset", async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = router;
