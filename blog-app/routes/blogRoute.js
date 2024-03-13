const express = require("express");

const router = express.Router();

const {
  getAllBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { verifyToken, blogVerifyUser } = require("../middleware/middleware");

router.route("/").get(getAllBlogs).post(verifyToken, createBlog);
router
  .route("/:id")
  .get(getBlog)
  .put(verifyToken, blogVerifyUser, updateBlog)
  .delete(verifyToken, blogVerifyUser, deleteBlog);

module.exports = router;