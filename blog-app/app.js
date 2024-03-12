const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const errorHandler = require("./controllers/errorHandler");
const { MONGO_URI } = require("./utils/config");
const blogRouter = require("./routes/blogRoute");
const userRouter = require("./routes/usersRoute");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => "Successfully connected to DB")
  .catch((err) => console.log(err));

app.use("/api/blog", blogRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

module.exports = app;
