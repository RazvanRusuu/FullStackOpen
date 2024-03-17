const express = require("express");

const router = express.Router();

const {
  getAllBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  addCommentToBlog,
} = require("../controllers/blogController");
const { verifyToken, blogVerifyUser } = require("../middleware/middleware");

router.route("/").get(getAllBlogs).post(verifyToken, createBlog);
router
  .route("/:id")
  .get(getBlog)
  .put(verifyToken, updateBlog)
  .delete(verifyToken, blogVerifyUser, deleteBlog);
router.post("/:id/comments", verifyToken, addCommentToBlog);

module.exports = router;
