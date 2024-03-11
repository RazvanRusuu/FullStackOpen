const express = require("express");
const cors = require("cors");
const blogRouter = require("./routes/blogRoute");
const errorHandler = require("./controllers/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blog", blogRouter);
app.use(errorHandler);

module.exports = app;
