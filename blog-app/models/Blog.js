const mongoose = require("mongoose");
const { MONGO_URI } = require("../utils/config");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
  },
  author: {
    type: String,
    minlength: 3,
    required: true,
  },
  url: String,
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
});

mongoose
  .connect(MONGO_URI)
  .then(() => "Successfully connected to DB")
  .catch((err) => console.log(err));

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
