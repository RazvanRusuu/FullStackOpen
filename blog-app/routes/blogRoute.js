const express = require("express");

const router = express.Router();

const {
  getAllBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { verifyToken } = require("../middleware/verifyToken");

router.route("/").get(getAllBlogs).post(verifyToken, createBlog);
router.route("/:id").get(getBlog).put(updateBlog).delete(deleteBlog);

module.exports = router;
